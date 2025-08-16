const express = require('express');
const connectDB = require('./connect'); 
const urlRoutes = require('./routes/url'); 
const URL = require('./models/Url'); 
const staticRoutes = require('./routes/staticRouter'); 
const path = require('path');

const cors = require('cors'); // <--- add cors

const app = express();

// Connect to MongoDB
connectDB('mongodb://localhost:27017/urlShortener')
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Middlewares
app.use(cors()); // <--- enable CORS for frontend
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Routes
app.use('/url', urlRoutes);
app.use('/', staticRoutes);

// Redirect route
app.get('/:shortUrl', async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;

    const entry = await URL.findOneAndUpdate(
      { shortUrl },
      { 
        $push: { 
          visitHistory: { timestamp: Date.now() } 
        } 
      },
      { new: true } // return updated doc
    );

    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.originalUrl);
  } catch (err) {
    console.error('Redirect error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
