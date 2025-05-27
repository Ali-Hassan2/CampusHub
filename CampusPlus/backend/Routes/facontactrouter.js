const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
const router = express.Router();
const facontact = require('../Models/facontact')


router.get('/getcontact/:department',async(req,res)=>{

    const {department} = req.params;
    console.log("The dep is: ",department)
    if(!department){
        res.status(404).json({
            success:false,
            message:"There is nothing in this call",
        })
    }

    try {
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
        const {department,email,phone} = req.body;
        console.log({department,email,phone})

        const newuser = new facontact({
            department:department.trim(),
            email:email.trim(),
            phone:phone.trim()
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
        console.log("There is an error while saving the data",err)
    }


})

module.exports = router;