const mongoose = require('mongoose')
const dotenv = require('dotenv')
const timetablemodel = require('./Models/timetablemodel')
dotenv.config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            
        })
        console.log("Yes connected")
    }
    catch(err){
        console.log("Sorry cannot connect to DB. The error is: ", err)
        process.exit(1)
    }
   
}

async function insertingtimetable (){
    try{
        await timetablemodel.insertMany([
            {department:"Computer Science",title:"forexample",file_url:"www.example.com"}
        ])
        console.log("Data inserted Successfully")
    }
    catch(err){
        console.log(`Error in inserting data`,err)
    }
    finally{
        mongoose.connection.close();
    }
}

async function runthese(){
    await connectDB()
    await insertingtimetable()
}

runthese();
