const express = require('express')
const router = express.Router();
const path = require('path')
const multer = require('multer')
const mongoose = require('mongoose')

const buspathModel = require('../Models/buspathModel')

router.get('/getbusroute',(req,res)=>{
    buspathModel.find()
    .then((rt)=>{
        res.status(200).json(rt)
    }).catch((err)=>{
        console.log("Error in taking route from db",err.message)
        res.status(500).json({success:false,msg:"Sorry unable to take route from db"})
    })
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage});

router.post('/uploadbus',upload.single('file'),async(req,res)=>{
    try
    {
        if(!req.file){
            return res.status(400).json({success:false,message:"Cannot found resource"})
        }
        // i am saving the filename 
        console.log(`saved filename is ${req.file.filename}`)
        console.log(`Generated file url is: ${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`);

        const {title} = req.body
        console.log(req.body.title)


        // i am making a new instance for bus route
        const newroute = new buspathModel({
            title,
            file_url:`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        });

        await newroute.save();
        res.status(200).send({success:true,message:"Yes uploaded Successfully",route:newroute})
    }
    catch(err)
    {
        console.log("Sorry cannot upload file",err)
        res.status(500).send({success:false,message:"Cannot upload file."})
    }
}

)



module.exports = router