const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected --> Auth Service'))
  .catch(err => console.log(err));

const PORT = 3001;
app.listen(PORT, () => console.log(`Auth Service => port => ${PORT}`));
