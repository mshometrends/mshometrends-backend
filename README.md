# MS Home Trends - Backend API

Robust backend REST API for MS Home Trends Luxury Tableware E-Commerce platform, built with Node.js, Express, TypeScript, MongoDB Atlas (Mongoose), and Cloudinary.

## Features
- **Database:** MongoDB Atlas with Mongoose ODM
- **Media Storage:** Cloudinary image asset upload & management
- **Product Management:** Full CRUD with filtering, categories, reviews, stock tracking
- **Order Processing:** WhatsApp and direct checkout with screenshot upload
- **Discount & Coupons:** Percentage and fixed discount voucher validations
- **Admin Endpoints:** Dashboard analytics, banner manager, inventory sync

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file from `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mshometrends?retryWrites=true&w=majority
   MONGODB_DB_NAME=mshometrends
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_FOLDER=mshometrends
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Build & Start Production:**
   ```bash
   npm run build
   npm start
   ```
