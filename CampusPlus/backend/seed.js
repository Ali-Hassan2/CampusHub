const mongoose = require('mongoose')
const pastpaperModel = require('./Models/pastpaperModel')
const dotenv = require('dotenv')
dotenv.config()

// conecting to db

async function connectDB(){
    try
    {   
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MONGODB CONNECTED")
    }
    catch(err){
        console.log("Error is:" ,err)
        process.exit(1);
    }
}

async function addingFixedData(){
    try{
        await pastpaperModel.insertMany([
            // Computer Science Semester 1
            { semester: "1", department: "Computer Science", subject: "Programming Fundamentals", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "1", department: "Computer Science", subject: "Applied Physics", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "1", department: "Computer Science", subject: "Pre Calculus", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "1", department: "Computer Science", subject: "Calculus and Analytical Geometry", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "1", department: "Computer Science", subject: "Ideology of Constitution of Pakistan", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "1", department: "Computer Science", subject: "Functional English", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            
            { semester: "1", department: "Computer Science", subject: "Programming Fundamentals", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "1", department: "Computer Science", subject: "Applied Physics", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "1", department: "Computer Science", subject: "Pre Calculus", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "1", department: "Computer Science", subject: "Calculus and Analytical Geometry", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "1", department: "Computer Science", subject: "Ideology of Constitution of Pakistan", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "1", department: "Computer Science", subject: "Functional English", file_url: "http://example.com/pf.pdf", type: "Final" },

            // Computer Science Semester 2
            { semester: "2", department: "Computer Science", subject: "Discrete Structures", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "2", department: "Computer Science", subject: "Object Oriented Programming", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "2", department: "Computer Science", subject: "Expository Writing", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "2", department: "Computer Science", subject: "Islamic Studies", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "2", department: "Computer Science", subject: "Multivairable Calculus", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "2", department: "Computer Science", subject: "Pre-Calculus-2", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "2", department: "Computer Science", subject: "Digital Logic Design", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },

            { semester: "2", department: "Computer Science", subject: "Discrete Structures", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "2", department: "Computer Science", subject: "Object Oriented Programming", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "2", department: "Computer Science", subject: "Expository Writing", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "2", department: "Computer Science", subject: "Islamic Studies", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "2", department: "Computer Science", subject: "Multivairable Calculus", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "2", department: "Computer Science", subject: "Pre-Calculus-2", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "2", department: "Computer Science", subject: "Digital Logic Design", file_url: "http://example.com/pf.pdf", type: "Final" },

            // Computer Science Semester 3
            { semester: "3", department: "Computer Science", subject: "Probability and Statistics", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "3", department: "Computer Science", subject: "Information Security", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "3", department: "Computer Science", subject: "COAL", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "3", department: "Computer Science", subject: "Computer Networks", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },
            { semester: "3", department: "Computer Science", subject: "DSA", file_url: "http://example.com/pf.pdf", type: "Mid-Term" },

            { semester: "3", department: "Computer Science", subject: "Probability and Statistics", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "3", department: "Computer Science", subject: "Information Security", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "3", department: "Computer Science", subject: "COAL", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "3", department: "Computer Science", subject: "Computer Networks", file_url: "http://example.com/pf.pdf", type: "Final" },
            { semester: "3", department: "Computer Science", subject: "DSA", file_url: "http://example.com/pf.pdf", type: "Final" },
   
    ]);
    console.log("Data Added Successfully")
    }
    catch(err)
    {
        console.log("Error while saving data: ",err)
    }
    finally{
        mongoose.connection.close();
    }
}

async function run()
{
    await connectDB();
    await addingFixedData();
}

run();

