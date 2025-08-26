# Blog Application

A full-stack blog application built with React (frontend) and Node.js/Express.js (backend).

## Architecture

This application has been migrated from Appwrite to a custom Node.js backend:

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **TailwindCSS** for styling
- **TinyMCE** for rich text editing
- **React Hook Form** for form handling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **Cloudinary** for image storage
- **Multer** for file uploads
- **bcryptjs** for password hashing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account

### Setup

1. **Clone and install dependencies:**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

2. **Configure environment variables:**

Frontend (`.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend (`backend/.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

FRONTEND_URL=http://localhost:5173
```

3. **Start the application:**
```bash
# Option 1: Use the startup script
./start.sh

# Option 2: Start manually
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

4. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Features

- ✅ User authentication (register/login/logout)
- ✅ Create, read, update, delete blog posts
- ✅ Rich text editor for post content
- ✅ Image upload for featured images
- ✅ Responsive design
- ✅ Post status management (active/inactive)
- ✅ User authorization (only post authors can edit/delete)

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Posts Endpoints
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create post (auth required)
- `PUT /api/posts/:slug` - Update post (auth + ownership required)
- `DELETE /api/posts/:slug` - Delete post (auth + ownership required)

### File Upload
- `POST /api/posts/upload` - Upload file (auth required)

## Migration Notes

This application was successfully migrated from Appwrite to a custom Node.js backend:

- **Authentication**: JWT-based instead of Appwrite Auth
- **Database**: MongoDB instead of Appwrite Database
- **File Storage**: Cloudinary instead of Appwrite Storage
- **API**: Custom Express.js API instead of Appwrite SDK

The frontend interface remains the same, but now uses custom API services instead of Appwrite SDK.