import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {z} from 'zod'; //zod is used for validation
import config from "../config.js";
import {Purchase} from "../models/purchase.model.js";
import {Course} from "../models/course.model.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

// validation means checking ki jo data user ne bheja hai wo sahi format mein hai ya nahi
  const userSchema = z.object({
    firstName: z.string().min(1, {message :"First name is required"}),
    lastName: z.string().min(1, {message :"Last name is required"}),
    email: z.email(),
    password: z.string().min(8, {message :"Password must be at least 8 characters long"}),
  })

  const validatedData = userSchema.safeParse(req.body); //safeParse ka matlab hai ki yeh data ko validate karega aur agar data sahi format mein hai toh success true hoga, warna false hoga
  if(!validatedData.success){
    return res.status(400).json({errors: validatedData.error.issues.map(err => err.message) });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        const isPasswordValid = await bcrypt.compare(password, user.password) ;
        if (!user || !isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //jwt code kaam karta hai ki yeh ek token generate karta hai jo user ko authenticate karne ke liye use hota hai

       const token = jwt.sign({
        id: user._id,
       }, config.JWT_USER_PASSWORD,
       {
        expiresIn: "1d",
       }
    );
    const cookieOptions ={
        expires: new Date(Date.now() + 24 * 60  * 1000), //1 day
        httpOnly: true, // cookie ko javascript se access nahi kar sakte
        secure: process.env.NODE_ENV === "production", // cookie ko https se access nahi kar sakte
        sameSite : "Strict", //CSRF attack prevention
    }

    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ message: "Login successful", user, token });
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

export const logout = (req, res) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(401).json({errors:"You are not logged in" });
        }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Error during Admin logout:", err);
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

export const purchased = async (req,res) =>{
       const userId = req.userId;

       try{
        const purchases = await Purchase.find({userId});

        let purchasedCourseId = [];

        for (let i =0; i < purchases.length; i++) {
            purchasedCourseId.push(purchases[i].courseId);
        }

        const courseData = await Course.find({ _id: { $in: purchasedCourseId } });

        res.status(200).json({ purchases, courseData });
       }
       catch(err){
        console.error('Error fetching purchased courses:', err);  
         res.status(500).json({ message: "Internal Server Error" });
      
       }

} 