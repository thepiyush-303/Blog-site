import Post from '../models/Post.js';
import { validationResult } from 'express-validator';
import { cloudinary, uploadToCloudinary } from '../middleware/upload.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    console.log('Received post data:', {
      body: req.body,
      file: req.file ? 'File present' : 'No file',
      user: req.user ? req.user.id : 'No user'
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { title, slug, content, status } = req.body;
    let featured_image = null;

    console.log('Starting image upload process...');
    // Upload image to Cloudinary if file exists
    if (req.file) {
      try {
        console.log('Uploading to Cloudinary:', req.file.originalname);
        const uploadResult = await uploadToCloudinary(
          req.file.buffer, 
          `${Date.now()}-${req.file.originalname}`
        );
        featured_image = uploadResult.secure_url;
        console.log('Image uploaded successfully:', featured_image);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    console.log('Checking for existing slug...');
    // Check if slug already exists
    if (slug) {
      try {
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
          console.log('Slug already exists:', slug);
          return res.status(400).json({
            success: false,
            message: 'Post with this slug already exists'
          });
        }
      } catch (dbError) {
        console.error('Database error checking slug:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Database error',
          error: dbError.message
        });
      }
    }

    console.log('Creating post in database...');
    try {
      const post = await Post.create({
        title,
        slug,
        content,
        featured_image,
        status: status || 'active',
        userId: req.user.id
      });

      console.log('Post created successfully:', post._id);
      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        post
      });
    } catch (createError) {
      console.error('Post creation error:', createError);
      return res.status(500).json({
        success: false,
        message: 'Failed to create post',
        error: createError.message
      });
    }
  } catch (error) {
    console.error('General error in createPost:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const { status = 'active', page = 1, limit = 10 } = req.query;
    
    const query = status ? { status } : {};
    const posts = await Post.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get Single Post
export const getPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug }).populate('userId', 'name email');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { slug } = req.params;
    const { title, content, status } = req.body;
    
    const post = await Post.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    // Handle image update
    let featured_image = post.featured_image;
    if (req.file) {
      // Delete old image from cloudinary if exists
      if (post.featured_image) {
        const publicId = post.featured_image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`blog-images/${publicId}`);
      }
      
      // Upload new image
      const uploadResult = await uploadToCloudinary(
        req.file.buffer, 
        `${Date.now()}-${req.file.originalname}`
      );
      featured_image = uploadResult.secure_url;
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { title, content, featured_image, status },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    // Delete image from cloudinary if exists
    if (post.featured_image) {
      const publicId = post.featured_image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`blog-images/${publicId}`);
    }

    await Post.findOneAndDelete({ slug });

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Upload File
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const uploadResult = await uploadToCloudinary(
      req.file.buffer, 
      `${Date.now()}-${req.file.originalname}`
    );

    res.json({
      success: true,
      message: 'File uploaded successfully',
      fileUrl: uploadResult.secure_url,
      fileId: uploadResult.public_id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete File
export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    await cloudinary.uploader.destroy(`blog-images/${fileId}`);
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
