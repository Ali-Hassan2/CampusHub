const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        enum:["admin","super_admin"],
        default:"admin"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin