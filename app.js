const { connectDB, app, express } = require('./config/db.js');
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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #2b5876, #4e4376);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #f0f0f0;
        }
        .container {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          animation: fadeIn 2s ease;
        }
        h1 {
          font-size: 3.5rem;
          margin-bottom: 10px;
          color: #61dafb;
          text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 300;
          color: #ffffff;
          text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .footer {
          margin-top: 20px;
          font-size: 1rem;
          color: #dcdcdc;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
      </style>
      <title>Welcome | Tech Haven</title>
    </head>
    <body>
      <div class="container">
        <h1>Tech Haven</h1>
        <h2>Your Gateway to Laptop Innovation</h2>
        <p class="footer">Backend Service for the Laptop Shop Project</p>
      </div>
    </body>
    </html>
  `);


});

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/laptop', laptopRoutes)
app.use('/category', categoryRoutes)
app.use('/brand', brandRoutes)
app.use('/rate', rateRoutes)
app.use('/cart', cartRoutes)
app.use('/cartItem', cartItemRoutes)

connectDB();
