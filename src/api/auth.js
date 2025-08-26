import apiService from './apiService.js';

export class AuthService {
  async createAccount({ email, password, name }) {
    try {
      const response = await apiService.post('/auth/register', {
        name,
        email,
        password
      });
      
      if (response.success) {
        // Auto login after registration
        return {
          ...response.user,
          $id: response.user.id
        };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const response = await apiService.post('/auth/login', {
        email,
        password
      });
      
      if (response.success) {
        return {
          ...response.user,
          $id: response.user.id
        };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiService.get('/auth/me');
      
      if (response.success) {
        return {
          ...response.user,
          $id: response.user.id
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
