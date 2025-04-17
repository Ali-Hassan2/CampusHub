const mongoose = require('mongoose')
const Admin = require('./Models/adminModel')
const bcrypt = require('bcryptjs');
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

async function seedAdmin() {
    try {
        

        
       
            const hashedPassword = await bcrypt.hash('unihelp@1234', 15);

            const Admins = [
                {
                    username: 'admin2', password: hashedPassword, email: 'admin2@example.com', role: 'admin'
                },
                {
                    username: 'admin3', password: hashedPassword, email: 'admin3@example.com', role: 'admin'
                },
                {
                    username: 'admin4', password: hashedPassword, email: 'admin4@example.com', role: 'admin'
                },
            ];

            await Admin.insertMany(Admins);
            console.log("Admins created");
    } catch (err) {
        console.log("Error seeding error is: ", err);
    }
}
async function runn(){
    await connectDB();
    await seedAdmin();
}

runn();