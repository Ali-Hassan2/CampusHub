const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const pastpaperRoute = require('./Routes/pastpaperRoute');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const adminlogin = require('./Routes/adminlogin');
const timetableroute = require('./Routes/timetableroute')
const buspathroute = require('./Routes/buspathroute')
const outlineroute = require('./Routes/outlineroute')
const facontactroute = require('./Routes/facontactrouter')

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
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src * 'self' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src * data: blob:;");
    next();
});


app.use('/api/pastpapers', pastpaperRoute);
app.use('/admin/login', adminlogin);
app.use('/api/timetable',timetableroute)
app.use('/api/busroute',buspathroute)
app.use('/api/outline',outlineroute)
app.use('/api/contact',facontactroute);

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
