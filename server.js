// const express = require('express');
// const app = express();
// const mongoose=require('mongoose');
// const bcrypt = require('bcrypt');
// mongoose.connect("mongodb+srv://yashwanth:yash_2103@cluster0.bze5e.mongodb.net/connection?retryWrites=true&w=majority&appName=Cluster0");
// const db=mongoose.connection;
// const http= require('http');
// http.createServer(app);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(__dirname));

// app.post('/signup', async (req, res) => {
//     try {
//         const { mobileNumber, myName, username, password } = req.body;
        
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new users({
//             user_name: username,
//             password: hashedPassword, 
//             mobile_number: mobileNumber, 
//             full_name: myName 
//         });

       
//         await newUser.save();
//         res.send("User registered successfully");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error in saving user");
//     }
// });

// app.listen(8000,'localhost',()=>{
//     console.log('server is running on port 8000');
// })


// MongoDB Connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   mobile: { type: String, required: true },
//   fullName: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// Signup Endpoint
// app.post('/signup', async (req, res) => {
//   const { username, password, mobile, fullName } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Hash the password and save the user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword, mobile, fullName });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error });
//   }
// });
// app.post('/', async (req, res) => {
//     console.log('Request Body:', req.body); // Log the request body for debugging
  
//     const { username, password, mobile, fullName } = req.body;
  
//     try {
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ username, password: hashedPassword, mobile, fullName });
//       await newUser.save();
  
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error during signup:', error); // Log detailed error
//       res.status(500).json({ message: 'Error creating user', error: error.message });
//     }
//   });

// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const User=require('./module/usermodule.js')
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());






// app.post("/login", async (req, res) => {
//     console.log('Request Body:', req.body); // Log the request body for debugging
  
//     const { username, password, mobile, fullName } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ username, password: hashedPassword, mobile, fullName });
//       await newUser.save();
//       res.status(201).json({ message: 'User registered successfully' });
//       try {
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//           return res.status(400).json({ message: 'Username already exists' });
//         }
//     } catch (error) {
//       console.error('Error during signup:', error); // Log detailed error
//       res.status(500).json({ message: 'Error creating user', error: error.message });
//     }
// });


// // Login Endpoint
// app.post("/signup", async (req, res) => {
//   const { username, password } = req.body;
//   console.log("heloojfgdhdjjfvh");

//   try {
    
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// });

// // Start the Server
// app.listen(5000,'localhost', () => {
//   console.log('Server running on port 5000');
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./module/usermodule.js'); // Assuming you have a Mongoose schema defined
const guser=require('./modules/guestuser.js')
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Signup Endpoint (Create User)
// app.post("/signup", async (req, res) => {
//     const { username, password, mobile, fullName } = req.body;
    
//     try {
//         // Hash password and save new user
//         // Check if username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword, mobile, fullName });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ message: 'Error creating user', error: error.message });
//     }
// });
app.post("/owner-signup", async (req, res) => {
    const { username, password, mobile, fullName } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Owner username already exists" });
        
      }
      const hasUpper=/[A-Z]/.test(password);
      const hasLower=/[a-z]/.test(password);
      const hasNum=/\d/.test(password);
      const splchar=/[!@#$%_]/.test(password);
      const space=/\s/.test(password);
      const length=password.length

      if(length<8){
        return res.status(400).json({valid:false,message:"password must be at least 8 characters"});
      }
      if(!hasUpper){
        return res.status(400).json({valid:false,message:"password must contain atleast one uppecase letter"});
      }
      if(!hasLower){
        return res.status(400).json({valid:false,message:"password cmust contain atleast one lowercase letter"});

      }
      if(!hasNum){
          return res.status(400).json({valid:false,message:"password must contain atleast one number"});

      }
      if(!splchar){
        return res.status(400).json({valid:false,message:"password must contain atleast one special character"});
      }
      if(space){
        return res.status(400).json({valid:false,message:"password must not contain any spaces"});
      }
  
      // Hash password and create a new owner user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newOwner = new User({ username, password: hashedPassword, mobile, fullName });
      await newOwner.save();
  
      res.status(201).json({ message: "Owner registered successfully" });
    } catch (error) {
      console.error("Error during owner signup:", error);
      res.status(500).json({ message: "Error creating owner", error: error.message });
    }
  });

  app.post("/guest-signup", async (req, res) => {
    const { username, password, mobile, fullName } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await guser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Guest username already exists" });
      }
      const hasUpper=/[A-Z]/.test(password);
      const hasLower=/[a-z]/.test(password);
      const hasNum=/\d/.test(password);
      const splchar=/[!@#$%_]/.test(password);
      const space=/\s/.test(password);
      const length=password.length

      if(length<8){
        return res.status(400).json({valid:false,message:"password must be at least 8 characters"});
        
      }
      if(!hasUpper){
        return res.status(400).json({valid:false,message:"password must contain atleast one uppecase letter"});
      }
      if(!hasLower){
        return res.status(400).json({valid:false,message:"password cmust contain atleast one lowercase letter"});

      }
      if(!hasNum){
          return res.status(400).json({valid:false,message:"password must contain atleast one number"});

      }
      if(!splchar){
        return res.status(400).json({valid:false,message:"password must contain atleast one special character"});
      }
      if(space){
        return res.status(400).json({valid:false,message:"password must not contain any spaces"});
      }
  
      // Hash password and create a new guest user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newGuest = new guser({ username, password: hashedPassword, mobile, fullName });
      await newGuest.save();
  
      res.status(201).json({ message: "Guest registered successfully" });
    } catch (error) {
      console.error("Error during guest signup:", error);
      res.status(500).json({ message: "Error creating guest", error: error.message });
    }
  });
    
// Login Endpoint
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Check if user exists
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Compare provided password with stored hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
// });
app.post("/owner-login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Owner not found" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      res.status(200).json({ message: "Owner login successful", user });
    } catch (error) {
      console.error("Error during owner login:", error);
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  });
  
  // Guest Login Route
  app.post("/guest-login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await guser.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Guest not found" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      res.status(200).json({ message: "Guest login successful", user });
    } catch (error) {
      console.error("Error during guest login:", error);
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  });
// Start the Server
app.listen(5000, 'localhost', () => {
    console.log('Server running on port 5000');
});
