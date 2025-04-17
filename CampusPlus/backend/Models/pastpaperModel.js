// In Models/pastpaperModel.js
const mongoose = require('mongoose');

const pastpaperSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Mid-Term', 'Final'],
        required: true,
    },
    file_url: {
        type: String,
        required: true,
    },
});

const pastpaperModel = mongoose.model('Pastpaper', pastpaperSchema);

module.exports = pastpaperModel; 
