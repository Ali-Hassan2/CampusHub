const mongoose = require('mongoose')

const busschema = mongoose.model('busschema',
    new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        file_url:{
            type:String,
            required:true
        }
    })
)

module.exports = busschema