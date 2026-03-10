import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from '../lib/cloudinary.js';

// Signup a new user
export const signup = async (req, res)=>{
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio){
            return res.json({success: false, message: "Missing Details" })
        }

        const user = await User.findOne({email});

        if(user){
            return res.json({success: false, message: "Account already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id)

        res.json({success: true, userData: newUser, token, message: "Account created successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Controller to login a user

export const login = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({email})

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect){
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id)

        res.json({success: true, userData, token, message: "Login successful"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// controller to check if the user is authenticated or not
export const checkAuth = (req,res) =>{
    res.json({ success: true, userData: req.user, message: "User is authenticated" });
}

// controller to update user profile
export const updateProfile = async (req, res) =>{
    try {
        const {profilePic, fullName, bio } = req.body;
        const userId = req.user._id;
        // debug: print env vars used for Cloudinary authentication
        console.log('Cloudinary env:', {
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          keyLength: process.env.CLOUDINARY_API_KEY?.length,
          secretLength: process.env.CLOUDINARY_API_SECRET?.length,
        });
        
        let updatedUser;
        if(!profilePic)
        {
           updatedUser =  await User.findByIdAndUpdate(userId, { fullName, bio }, { returnDocument: 'after' }); 
        }
        else
            {
            
             // diagnostic logging: show first 100 characters of base64 to confirm
             console.log('Cloudinary upload starting, profilePic length:', profilePic?.length);
             try {
               const upload = await cloudinary.uploader.upload(profilePic);
               updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio, profilePic: upload.secure_url }, { returnDocument: 'after' });
             } catch (cloudError) {
               console.log('Cloudinary upload failed:', cloudError);
               throw cloudError; // will be caught by outer catch
             }
            }

             res.json({ success: true, user: updatedUser, message: "Profile updated successfully" })
        } catch (error) {
            console.log('updateProfile error:', error);
            res.json({ success: false, message: error.message })
        }
    }