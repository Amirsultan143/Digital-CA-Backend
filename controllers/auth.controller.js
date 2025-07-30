const User = require('../models/user.model');
const { generateToken } = require('../utils/token');

// Register a new user
exports.signup = async (req,res)=>{
    try{
        const {name, email, password, role} = req.body;
        // Check if all fields are provided
        if(!name || !email || !password || !role){  
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});  
        }
        const user = await User.create({name,email,password,role});
        console.log("User created successfully:", user);
        const token = generateToken(user);

        res.status(201).json({ token, user: { _id: user._id, name: user.name, role: user.role } });
    }catch(error){
        console.log(error);   
        res.status(500).json({ message: "Signup failed",error: error.message });
    }
};


exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = generateToken(user);
        res.status(200).json({ token, user: { _id: user._id, name: user.name, role: user.role } });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
}