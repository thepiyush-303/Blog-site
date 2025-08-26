# Blog Backend

This is a Node.js/Express.js backend for the Blog application, replacing the original Appwrite backend.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Copy `.env` file and update the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (authenticated)
- `POST /api/auth/logout` - Logout user

### Posts
- `GET /api/posts` - Get all posts (public)
- `GET /api/posts/:slug` - Get single post by slug (public)
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:slug` - Update post (authenticated, author only)
- `DELETE /api/posts/:slug` - Delete post (authenticated, author only)

### File Upload
- `POST /api/posts/upload` - Upload file (authenticated)
- `DELETE /api/posts/file/:fileId` - Delete file (authenticated)

## Database Schema

### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)

### Post
- title: String (required)
- slug: String (required, unique)
- content: String (required)
- featured_image: String (optional)
- status: String (enum: ['active', 'inactive'])
- userId: ObjectId (ref: User)

## Features

- User authentication with JWT
- File upload with Cloudinary
- CRUD operations for blog posts
- Input validation
- Error handling
- CORS configuration
- Cookie-based authentication
