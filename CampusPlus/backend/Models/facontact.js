const mongoose = require('mongoose');

const facontact = mongoose.model('facontact', new mongoose.Schema({
    department:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    }
}))