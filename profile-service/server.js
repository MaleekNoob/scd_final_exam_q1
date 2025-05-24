const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const profileRoutes = require('./routes/profile');

app.use('/api/profile', profileRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to Profile Service'))
  .catch(err => console.log(err));

const PORT = 3004;
app.listen(PORT, () => console.log(`Profile Service running on port ${PORT}`));
