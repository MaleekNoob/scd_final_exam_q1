const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const blogRoutes = require('./routes/blogs');

app.use('/api/blogs', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to Blog Service'))
  .catch(err => console.log(err));

const PORT = 3002;
app.listen(PORT, () => console.log(`Blog Service running on port ${PORT}`));
