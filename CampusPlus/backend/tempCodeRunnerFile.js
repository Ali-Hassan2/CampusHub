const mongoose = require('mongoose');
const facontact = require('../backend/Models/facontact')
const express = require('express')
const dotenv = require('dotenv')

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Mongo connected")
    } catch (error) {
        console.log("Error in connecting db",error)
    }
}


async function insertingdata(){


    try {
        await facontact.insertMany([
            {department:"Computer Science",mail:"dashed@dashed.com",phone:"222222222"}
        ])
        console.log("Data inserted Successfully")

    } catch (error) {
        console.log("There is an error while inserting data");
        process.exit(1)
    }
}

const runthese = async()=>{
    await connectDb();
    await insertingdata();
}
runthese();



