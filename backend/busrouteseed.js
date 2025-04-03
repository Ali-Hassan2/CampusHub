const mongoose = require('mongoose')
const dotenv = require('dotenv')
const buspathModel = require('./Models/buspathModel')
dotenv.config()
const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Yes connected Bro")
    }).catch(err =>{
        console.log("Error in connecting DB:" ,err)
    })
}

async function inserttobus(){
    try {
         await buspathModel.insertMany([
            {file_url:"www.hy.com"}
         ])
         console.log("Inserted Successfully")
    } catch (error) {
        console.log("No there is an error in inserting data.",error)
        process.exit(1)
    }
    finally{
        mongoose.connection.close();
    }
}

async function runthesetwo(){
    await connectDB();
    await inserttobus();
}

runthesetwo();