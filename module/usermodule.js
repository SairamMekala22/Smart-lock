// const { timeStamp } = require('console');
const mongoose=require('mongoose');

// import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://yashwanth:yash_2103@cluster0.bze5e.mongodb.net/input?retryWrites=true&w=majority&appName=Cluster0")
// .then(() => console.log('Connected to MongoDB'))
.catch(()=>{
    console.log('Error connecting to MongoDB');
})
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    mobile: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    resetToken: String,
    resetTokenExpiry: Date,
    googleId: String,
  
},);

const User = mongoose.model('User', userSchema);
module.exports=User;
