const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.mongodbUrl);
        console.log('database connected successfully');
    }catch(err){
        console.log('failed to connect to Database', err);
        process.exit(1);
    }
}

module.exports = connectDB;