const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')
const outlineModel = require('../Models/outlineModel')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const uniqueness = Date.now();
        cb(null,uniqueness + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})


router.get('/getoutline/:department/:semester/:subject',async(req,res)=>{
    try {

        const {department,semester,subject} = req.params;

        console.log("The dep is ",department)
        console.log("The semester is ",semester)
        console.log("The subject is ",subject)

        const outlines = await outlineModel.find({department,semester,subject})
        res.status(200).json(outlines)
        
    } catch (error) {
        res.status(500).json({success:false, msg:"Sorry there is nothing error from backend"})
    }
})




router.post('/uploadoutline',upload.single('file'),async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).send({success:false,message:"Nothing found"})   
        }
        console.log(req.body)
        const {department,semester,subject,title} = req.body
        console.log("The department is: ",department)
        console.log("The semester is: ",semester)
        console.log("The subject is: ",subject)
        console.log("The title is: ",title)

        const newOutline = new outlineModel({
            department,
            semester,
            subject,
            title,
            file_url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        })
        await newOutline.save();
        res.status(200).json({success:true,message:"Yes file uploaded"})
    }
    catch(err){
        console.log("Error in post request")
        res.status(500).json({success:false,message:"There is an error while uploading file"})
    }
})


router.delete('/removeoutline/:id',async(req,res)=>{

    try{
    const {id} = req.params;
    console.log("Id is:",id)
    const deletingoutline = await outlineModel.findByIdAndDelete(id)
    if(!deletingoutline){
        res.status(404).json({success:false,message:"Nothing found"})
    }
    res.status(200).json({success:true,message:"Yes deleted successfully"})
    }
    catch(error){
        console.log("There is an error",error)
        res.status(500).json({success:false,message:"Error in deleting"})
    }
})

module.exports = router