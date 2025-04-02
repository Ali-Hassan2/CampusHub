const mongoose = require('mongoose')

const timetableschema = new mongoose.Schema({
    department:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    file_url:{
        type:String,
        required:true
    }
})

const timetableModel = mongoose.model('Timetable',timetableschema)

module.exports = timetableModel