import apiService from './apiService.js';

export class Service {
  async createPost({ title, slug, content, featured_image, status, userId }) {
    try {
      const formData = new FormData();
      formData.append('title', title || '');
      formData.append('slug', slug || '');
      formData.append('content', content || '');
      formData.append('status', status || 'active');
      
      // Log the data being sent for debugging
      console.log('Creating post with data:', {
        title,
        slug,
        content: content ? content.substring(0, 100) + '...' : 'No content',
        status,
        hasImage: !!featured_image
      });
      
      if (featured_image instanceof File) {
        formData.append('featured_image', featured_image);
      }

      const response = await apiService.post('/posts', formData);
      
      if (response.success) {
        return {
          ...response.post,
          $id: response.post._id
        };
      } else {
        throw new Error(response.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featured_image, status }) {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('status', status || 'active');
      
      if (featured_image instanceof File) {
        formData.append('featured_image', featured_image);
      }

      const response = await apiService.put(`/posts/${slug}`, formData);
      
      if (response.success) {
        return {
          ...response.post,
          $id: response.post._id
        };
      } else {
        throw new Error(response.message || 'Failed to update post');
      }
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      const response = await apiService.delete(`/posts/${slug}`);
      return response.success;
    } catch (error) {
      console.error('Delete post error:', error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const response = await apiService.get(`/posts/${slug}`);
      
      if (response.success) {
        return {
          ...response.post,
          $id: response.post._id
        };
      } else {
        return false;
      }
    } catch (error) {
      console.error('Get post error:', error);
      return false;
    }
  }

  async getPosts(queries = []) {
    try {
      // Convert queries array to query parameters
      const params = {};
      
      // Handle status filter (default from Appwrite was Query.equal("status", "active"))
      const statusQuery = queries.find(q => q.includes && q.includes('status'));
      if (statusQuery || queries.length === 0) {
        params.status = 'active';
      }

      const response = await apiService.get('/posts', params);
      
      if (response.success) {
        return {
          documents: response.posts.map(post => ({
            ...post,
            $id: post._id
          })),
          total: response.total
        };
      } else {
        return false;
      }
    } catch (error) {
      console.error('Get posts error:', error);
      return false;
    }
  }

  // File upload service
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiService.post('/posts/upload', formData);
      
      if (response.success) {
        return {
          $id: response.fileId,
          name: file.name,
          href: response.fileUrl
        };
      } else {
        return false;
      }
    } catch (error) {
      console.error('Upload file error:', error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await apiService.delete(`/posts/file/${fileId}`);
      return response.success;
    } catch (error) {
      console.error('Delete file error:', error);
      return false;
    }
  }

  getFilePreview(fileId) {
    // For our new system, fileId is actually the full URL
    if (fileId && fileId.startsWith('http')) {
      return fileId;
    }
    
    // Fallback for old format
    return `${apiService.baseURL}/posts/file/${fileId}`;
  }
}

const service = new Service();
export default service;
