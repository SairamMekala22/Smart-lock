const { timeStamp } = require('console');
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://yashwanth:yash_2103@cluster0.bze5e.mongodb.net/input?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Connected to MongoDB'))
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
    }
}, { timestamps: true });

const guser = mongoose.model('guser', userSchema);
module.exports = guser;
