const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
const router = express.Router();
const facontact = require('../Models/facontact')


router.get('/getcontact',async(req,res)=>{
    if(!req.department){
        res.status(404).json({
            success:false,
            message:"There is nothing in this call",
        })
    }

    try {
        const {department} = req.params;

        const newuse = await facontact.find({department});
        res.status(200).json(newuse);
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"There is an error."
        })
    }

})


router.post('/addcontact/:mail/:phone',async(req,res)=>{

    try{
        const {department,mail,phone} = req.body;

        const newuser = new facontact({
            department:department,
            mail:mail,
            phone:phone
        })

        await newuser.save();
        res.status(200).json({
            success:true,
            message:"There is an error while saving the new user.",
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"There is an error while",
        })
        console.log("There is an error while saving the data",error)
    }


})

module.exports = router;