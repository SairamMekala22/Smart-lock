const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer =require( 'nodemailer');
const jwt =require('jsonwebtoken');
const User = require('./module/usermodule.js'); // Assuming you have a Mongoose schema defined
const guser=require('./modules/guestuser.js')
const app = express();
app.use(bodyParser.json());
const crypto = require("crypto"); // To generate a secure OTP

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend's port
  methods: ['GET','POST'],
  credentials: true, // important for sessions/cookies
}));

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'smartshield22@gmail.com', // Your Gmail address
    pass: 'bdht uuiv efbd corr', // Your app password or Gmail password
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates (use cautiously)
  }
});
// Middleware to check authentication
// const authenticateUser = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ status: "not-authenticated" });
//   }
  
//   jwt.verify(token, JWT_SECRET, async (err, decoded) => {
//     if (err) return res.status(401).json({ status: "not-authenticated" });
    
//     req.user = await collection.findById(decoded.id); //await is used to pause the execution of an async function until a Promise is resolved or rejected.
//     next();
//   });
// };

// app.get("/authenticated", authenticateUser, (req, res) => {      //Uses the authenticateUser middleware to protect the /authenticated route.
//   res.json({ status: "authenticated", user: req.user });
// });

// Temporary store for OTPs (use a database or cache in production)
const otpStore = {};

// Generate and send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const existingEmail=await User.findOne({email});

  try {

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!existingEmail) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP temporarily (associate with the email)
    otpStore[email] = otp;

    // Send OTP via email
    const mailOptions = {
      from: "smartshield22@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });

    // Clear OTP after 10 minutes
    setTimeout(() => delete otpStore[email], 10 * 60 * 1000);
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    if (!otp || !newPassword) {
      return res.status(400).json({ message: "OTP and new password are required" });
    }

    // Check if the OTP is correct
    if (otpStore[email] !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Delete OTP after successful verification
    delete otpStore[email];

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
});


app.post("/owner-signup", async (req, res) => {
    const { username, password, mobile, email } = req.body;
  
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
      const newOwner = new User({ username, password: hashedPassword, mobile, email });
      await newOwner.save();
  
      res.status(201).json({ message: "Owner registered successfully" });
    } catch (error) {
      console.error("Error during owner signup:", error);
      res.status(500).json({ message: "Error creating owner", error: error.message });
    }
  });

  app.post("/guest-signup", async (req, res) => {
    const { username, password, mobile, email } = req.body;
  
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
      const newGuest = new guser({ username, password: hashedPassword, mobile, email });
      await newGuest.save();
  
      res.status(201).json({ message: "Guest registered successfully" });
    } catch (error) {
      console.error("Error during guest signup:", error);
      res.status(500).json({ message: "Error creating guest", error: error.message });
    }
  });
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
  app.listen(5000, 'localhost', () => {
    console.log('Server running on port 5000');
});
  
  // Guest Login Route
  // app.post("/guest-login", async (req, res) => {
  //   const { username, password } = req.body;
  
  //   try {
  //     // Check if the user exists
  //     const user = await guser.findOne({ username });
  //     if (!user) {
  //       return res.status(404).json({ message: "Guest not found" });
  //     }
  
  //     // Compare passwords
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(401).json({ message: "Invalid credentials" });
  //     }
  
  //     res.status(200).json({ message: "Guest login successful", user });
  //   } catch (error) {
  //     console.error("Error during guest login:", error);
  //     res.status(500).json({ message: "Error logging in", error: error.message });
  //   }
  // });
// Start the Server

