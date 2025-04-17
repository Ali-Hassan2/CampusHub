const express = require('express')
const router = express.Router();
const multer = require ('multer')
const path = require('path')
const pastpaperModel = require('../Models/pastpaperModel')

router.get('/',async(req,res)=>{
    try{
        console.log(req.body)
    const pp = await pastpaperModel.find();
    res.status(200).json(pp);
    }
    catch(err)
    {
        res.status(500).json({success:false,
            msg:"Sorry cannot fetch the data."
        })
    }
})
router.post('/',async(req,res)=>{
    const {department,subject,semester,type,file_url} = req.body;
    const newpaper = new pastpaperModel({department,subject,semester,type,file_url});
    await newpaper.save();
    res.status(200).json({success:true,
        msg:"Yes saved"
    })
})

router.get('/subjects/:semester/:department', async (req, res) => {
    try {
        const { semester, department } = req.params;
        const subjects = await pastpaperModel.distinct("subject", { semester , department }); 
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ success: false, msg: "Sorry, cannot fetch subjects." });
    }
});

router.get('/papers/:semester/:department/:subject/:type', async (req, res) => {
    try {
        const { semester, department, subject, type } = req.params;
        const papers = await pastpaperModel.find({ semester, department, subject, type });
        res.status(200).json(papers);
    } catch (err) {
        res.status(500).json({ success: false, msg: "Sorry, cannot fetch past papers." });
    }
});







const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        const { department, subject, semester, type, title } = req.body;

        const newPastpaper = new pastpaperModel({
            department,
            subject,
            semester,
            type,
            file_url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

        });

        await newPastpaper.save();
        res.status(200).send({ message: 'Past paper uploaded successfully!', pastpaper: newPastpaper });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error uploading file', error });
    }
});



router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPaper = await pastpaperModel.findByIdAndDelete(id);

        if (!deletedPaper) {
            return res.status(404).json({ success: false, msg: "Paper not found." });
        }

        res.status(200).json({ success: true, msg: "Paper deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Error deleting paper." });
    }
});



module.exports = router

