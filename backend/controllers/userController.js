import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'validator'



//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
            
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

    // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({success:false, message: "User not found" });
        }

        // Check password

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({success:false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = createToken(user._id);

        res.json({
            success:true,
            token
        });

         
        }

    catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({success:false, message: "Internal Login server error" });
    }



}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}


//register user
const registerUser = async (req, res) => {

    const {name, email, password} = req.body;

    try{
        //check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({success:false, message: "User already exists" });
        }

        //validate email format and password strength

        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false, message: "Invalid email format" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({success:false, message: "Weak password. Password must be at least 8 characters long and include a mix of letters, numbers, and symbols." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await userModel.create({ name, email, password: hashedPassword });

        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);
        res.json({
            success:true,
            token
        })




        

    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({success:false, message: "Internal server error" });

    }



}

//logout user
const logoutUser = async (req, res) => {

}

export { loginUser, registerUser, logoutUser };