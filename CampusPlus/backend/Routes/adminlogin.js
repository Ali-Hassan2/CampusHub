const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../Models/adminModel')
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config();

router.post('/',async (req,res)=>{
    console.log(req.body)
    const {username,password} = req.body;
    try{
        const admin = await Admin.findOne({username});
        if(!admin) 
            return res.status(404).json({success:false,message:"Not a valid Username"})

        const match = await bcrypt.compare(password,admin.password)

        if(!match)
            return res.status(404).json({success:false,message:"Invalid Password"})

        // generating token

        const token = jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:'1h'})

        res.status(200).json({success:true,message:"Login Successfully",token})
    }
    catch(err)
    {
        res.status(500).json({message:"Server error: ",err})
    }
})

module.exports = router