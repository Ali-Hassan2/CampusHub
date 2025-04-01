const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const pastpaperRoute = require('./Routes/pastpaperRoute');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const adminlogin = require('./Routes/adminlogin');

const app = express();
dotenv.config();
connectDB();
const port = process.env.PORT || 8080;


// app.use(cors({
//     origin: "http://localhost:5173", 
//     methods: ["GET", "POST", "PUT", "DELETE"], 
//     credentials: true 
// }));

// accept kr lo request hr jagah se
app.use(cors());


app.use(express.json());

app.use('/api/pastpapers', pastpaperRoute);
app.use('/admin/login', adminlogin);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send("Hello bhirava");
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
