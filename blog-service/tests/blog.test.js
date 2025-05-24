const request = require('supertest');
const axios = require('axios');
const app = require('../server');

jest.mock('axios');

describe('Blog Service Tests', () => {
  let authToken;

  beforeAll(async () => {
    const mockLoginResponse = {
      data: {
        token: 'mock-jwt-token'
      }
    };

    axios.post.mockResolvedValueOnce(mockLoginResponse);

    const loginResponse = await axios.post('http://auth-service/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });

    authToken = loginResponse.data.token;
  });

  it('should create a blog post when authenticated', async () => {
    const blogData = {
      title: 'Test Blog Post',
      content: 'This is a test blog post content.'
    };

    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(blogData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Blog created successfully');
    expect(response.body).toHaveProperty('blog');
    expect(response.body.blog.title).toBe(blogData.title);
    expect(response.body.blog.content).toBe(blogData.content);
  });
  it('should reject blog creation without authentication', async () => {
    const blogData = {
      title: 'Unauthorized Blog Post',
      content: 'This should not be allowed'
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(blogData);

    expect(response.status).toBe(401);
  });
});
