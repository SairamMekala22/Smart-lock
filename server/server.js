const express=require('express');
const path = require('path');
const app=express();
const bcrypt=require('body-praser');
const cors=require('cors');
const { error } = require('console');
const PORT=process.env.PORT || 3500;





// database

app.use(cors());
app.use(express.json());

// sign up
app.post('/signup',async(req,res)=>{
    try{
        const {username,password}=req.body;

        if(!username || !password){
            if(!username && !password){
                return res.status(400).json({error:'Username and password are required'});

            }
            else if(!username){
                return res.status(400).json({error:'Username is required'});

            }
            else{
                return res.status(400).json({error:'Username is required'});

            }
            
        }
        const exists=users.findOne(user => user.username === username);

        if(exists){
            return res.status(409).json({error: 'Username already exists.'});
        }

        const hashedPassword =await bcrypt.hash(password,10);

        // saving users
        const newUser= new User({username,password: hashedPassword });
        await newUser.save();


        res.status(201).json({message: 'User registered successfully!'});
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Server error'});
    }
});

app.post('/login',async(req,res)=>{
    try{
        const{username,password}=req.body;

        if(!username ||!password){
            return res.status(400).json({error:'username and password are required to login'});
        }

        const user =await User.findOne({username});
        if(!user){
            return res.status(401).json({error:'Invalid username  password'});

        }
        const passwordValid=await bcrypt.compare(password,user.password);
        if(!passwordValid){
            return res.status(401).json({error: 'Invalid password'});

        }

        res.status(200).json({message: 'Login successful'})

        
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Server Error'});
    }
})






app.listen(PORT,()=>{console.log('server started on port 3500')});