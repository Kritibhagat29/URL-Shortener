const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Enable strict query mode
async function connectDB(url) {
    return mongoose.connect(url);
}

module.exports = connectDB;
