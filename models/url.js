const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { 
    type: String, 
    required: true 
},
  shortUrl: { 
    type: String, 
    required: true, 
    unique: true 
},
  visitHistory: [{timestamp: {type:Number}}],
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
}
);     

const URL = mongoose.model('url', urlSchema);
module.exports = URL;