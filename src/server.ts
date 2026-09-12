import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { configureCloudinary } from './config/cloudinary.js';
import { apiRouter } from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB().catch((err) => {
  console.error('[MongoDB Error] Initial connection failed:', err);
});

// Configure Cloudinary
try {
  configureCloudinary();
  console.log('[Cloudinary] Initialized successfully');
} catch (err) {
  console.error('[Cloudinary Error] Configuration failed:', err);
}

// Middleware
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests from any origin with credentials reflected
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-admin-key',
    'x-admin-token',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-CSRF-Token',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Date',
    'X-Api-Version',
  ],
  exposedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Strip duplicate /api/v1/api/v1/ in incoming request URLs (Safeguard for misconfigured frontend envs)
app.use((req, _res, next) => {
  if (req.url.includes('/api/v1/api/v1/')) {
    req.url = req.url.replace(/\/api\/v1\/api\/v1\//g, '/api/v1/');
  }
  next();
});

// Ensure DB is connected in serverless environments
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
  } catch (err) {
    // Non-blocking log
  }
  next();
});

// API Routes (Mounted under /api/v1, /api, and fallback duplicate path for full compatibility)
app.use('/api/v1/api/v1', apiRouter);
app.use('/api/v1', apiRouter);
app.use('/api', apiRouter);

// Health check endpoints
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Only start listening if running standalone (local dev / Docker / VPS). On Vercel serverless, Vercel invokes the exported app directly.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 MS Home Trends Backend API running on http://localhost:${PORT}`);
  });
}

export default app;
