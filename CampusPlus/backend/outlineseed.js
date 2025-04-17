const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const outlinemodel = require('./Models/outlineModel')
dotenv.config();


const connectDB = ()=>{

         mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }).then(()=>{
            console.log("Yes mongo connected")
        }).catch(err=>{
            console.log("Error in connecting ",err)
        })
}

async function insertingoutline(){
    try {
        await outlinemodel.insertMany([
            {department:"Computer Science",semester:"1",subject:"Programming Fundamentals",title:"Outling_PF",file_url:"www.pfoutline.com"}
        ])
        console.log("Data inserted")
    } 
    catch (error) {
        console.log("There is an error while inserting data",error)
        process.exit(1)
    }
    finally{
        mongoose.connection.close()
    }
}


async function runout(){
    await connectDB();
    await insertingoutline()
}

runout();