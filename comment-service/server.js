const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const commentRoutes = require('./routes/comments');
// health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/comments', commentRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to Comment Service'))
  .catch(err => console.log(err));

const PORT = 3003;
app.listen(PORT, () => console.log(`Comment Service running on port ${PORT}`));
