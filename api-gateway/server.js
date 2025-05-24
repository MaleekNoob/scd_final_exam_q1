const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const cors = require('cors');
const jwtVerificationMiddleware = require('./middleware/jwtVerification');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const protectedRoutes = [
  // '/api/comments$',
  '/api/profile'                    
];

app.use(
  protectedRoutes,
  jwtVerificationMiddleware
);


app.use('/api/auth', createProxyMiddleware({ 
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/blogs', createProxyMiddleware({ 
  target: process.env.BLOG_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/comments', createProxyMiddleware({ 
  target: process.env.COMMENT_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/profile', createProxyMiddleware({ 
  target: process.env.PROFILE_SERVICE_URL,
  changeOrigin: true
}));

const PORT = 3000;
app.listen(PORT, () => console.log(`port => ${PORT}`));
