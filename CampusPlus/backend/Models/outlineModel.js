const mongoose = require('mongoose')

const outlineschema =  mongoose.model('outllineschema', new mongoose.Schema({
    department:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,        
    },
    title:{
        type:String,
        required:true,
    },
    file_url:{
        type:String,
        required:true,
    },

}))

module.exports = outlineschema