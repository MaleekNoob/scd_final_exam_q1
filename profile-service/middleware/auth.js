const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];

  try {
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/verify`, { token });
    
    if (response.data.valid) {
      req.user = response.data.user;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Token verification failed.' });
  }
};
