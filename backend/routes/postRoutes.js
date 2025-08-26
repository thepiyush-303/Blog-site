import express from 'express';
import { body } from 'express-validator';
import { 
  createPost, 
  getPosts, 
  getPost, 
  updatePost, 
  deletePost,
  uploadFile,
  deleteFile 
} from '../controllers/postController.js';
import auth from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Validation rules
const postValidation = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('content').custom((value) => {
    if (!value) {
      throw new Error('Content is required');
    }
    // Remove HTML tags to check actual text content length
    const textContent = value.replace(/<[^>]*>/g, '').trim();
    if (textContent.length < 10) {
      throw new Error('Content must be at least 10 characters long (excluding HTML tags)');
    }
    return true;
  }),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
];

// Routes
router.get('/', getPosts);
router.get('/:slug', getPost);
router.post('/', auth, upload.single('featured_image'), postValidation, createPost);
router.put('/:slug', auth, upload.single('featured_image'), postValidation, updatePost);
router.delete('/:slug', auth, deletePost);

// File routes
router.post('/upload', auth, upload.single('file'), uploadFile);
router.delete('/file/:fileId', auth, deleteFile);

export default router;
