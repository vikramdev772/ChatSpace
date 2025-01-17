import cloudinary from "../config/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {

        if(!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required"})
        }
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if(newUser) {
            
            const token =  generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
              _id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              token
            })
        } else {
            res.status(400).json({ message: "Invalid user data"});
        }

    }catch (error) {
        res.status(500).json({ message: "Internal server Error"})
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: "Invalid credentials" })
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if(!isPassword) {
            return res.status(400).json({ message: "Invalid Password "});
        }

        const token = generateToken(user._id, res);
      
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            token
        })

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const signout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({
            msg: "logged out successfully"
        })
    } catch (error) {
        res.status(500).json({ msg: "Internal server Error"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is requried"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            {new: true}
        ).select('-password');
        
        res.status(200).json(updateUser)
    } catch (error) {
        console.log("Error in the Update profile", error);
    }
};

export const checkAuth = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "User not authenticated"})
        }
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}