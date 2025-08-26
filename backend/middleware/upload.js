import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Cloudinary config debug:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing'
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage for multer
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Custom middleware to upload to Cloudinary
const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    // Ensure Cloudinary is configured before each upload
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log('Uploading with config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing'
    });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'blog-images',
        public_id: filename,
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload stream error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload successful:', result.secure_url);
          resolve(result);
        }
      }
    );
    
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};

export { upload, cloudinary, uploadToCloudinary };
