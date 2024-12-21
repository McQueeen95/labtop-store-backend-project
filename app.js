// const { connectDB, app, express } = require('../config/db.js');
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();

const DB_URI = process.env.DB_URI;
const port = process.env.PORT;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, clientOptions);
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`app is listening on port ${port} locally`);
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

// module.exports = { app, express, connectDB };
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes.js');
const laptopRoutes = require('./routes/laptopRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const brandRoutes = require('./routes/brandRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const rateRoutes = require('./routes/rateRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const cartItemRoutes = require('./routes/cartItemRoutes.js')


app.use(cors());
app.use(express.json()); // this allow us to use json to send and receive data
app.use(express.urlencoded({ extended: true })); // this allow us to use url to send and receive data
app.use(helmet());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/laptop', laptopRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/rate', rateRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/cartItem', cartItemRoutes)

connectDB();
