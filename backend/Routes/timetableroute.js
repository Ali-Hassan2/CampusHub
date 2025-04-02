const express = require("express")
const router = express.Router();
const path = require('path')
const multer = require('multer')
const timetableModel = require('../Models/timetablemodel')



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });

// const upload = multer({ storage: storage });


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const uniquesuffix = Date.now()
        cb(null, uniquesuffix + path.extname(file.originalname))
    }
})

const upload = multer ({storage:storage});


router.get("/gettimetable/:department",async (req,res)=>{
    try{
        const {department} = req.params
        const tt = await timetableModel.find({department});
        res.status(200).json(tt)
    }
    catch(err)
    {
        res.status(500).send({success:false,msg:"Sorry nothing available"})
    }
});


router.post('/upload', upload.single('file'), async(req,res)=>{
    try {
        
        if(!req.file){
            return res.status(400).send({ success: false, message: "No file uploaded" });
        }

       
        const {department,title} = req.body
        console.log(req.body.title)
        console.log(req.body.department)
        console.log(req.file)
        const newtimetable = new timetableModel({
            department,
            title,
            file_url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        });

        await newtimetable.save();
        res.status(200).send({success:true,message:"Yes Uploaded Timetable.",timetable:newtimetable})
    } catch (error) {
        console.log("no bro there is an error while uploading file",error)
        res.status(500).send({success:false,message:"Cannot upload file",})
    }
})


module.exports = router