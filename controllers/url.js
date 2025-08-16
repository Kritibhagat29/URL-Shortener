const { nanoid } = require('nanoid');
const URL = require('../models/Url');

async function generateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'Invalid or missing originalUrl' });
    }

    const shortUrl = nanoid(8);

    await URL.create({
        originalUrl: body.url,
        shortUrl: shortUrl,
        visitHistory: []
});

// Full short URL
    const fullUrl = `http://localhost:8001/${shortUrl}`;

    // 🔹 If form submitted via browser → render EJS
    if (req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
      return res.render('index', { 
        id: shortUrl, 
        fullUrl 
      });
    }

    // 🔹 Otherwise → return JSON (for API/React)
    return res.json({ shortUrl, fullUrl });


    //return res.json({ shortUrl: shortUrl });
}

async function getAnalytics(req, res) {
    const shortUrl  = req.params.shortUrl;
    const result = await URL.findOne({ shortUrl });
    return res.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory });
}

module.exports = { generateShortUrl, getAnalytics };