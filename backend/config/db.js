 const mongoose = require('mongoose');

 const connectDB = async () => {
    try{
   await mongoose.connect(process.env.MONGO_URI, {});
   console.log('MONGO DB connected');
    }catch(err){
        console.log('Error connecting to mongo db', err);
        process.exit(1);
    }
 }

 module.exports = connectDB;