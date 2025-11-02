import { Admin } from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {z} from 'zod'; //zod is used for validation
import config from "../config.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

// validation means checking ki jo data Admin ne bheja hai wo sahi format mein hai ya nahi
  const adminSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })

  const validatedData = adminSchema.safeParse(req.body); //safeParse ka matlab hai ki yeh data ko validate karega aur agar data sahi format mein hai toh success true hoga, warna false hoga
  if(!validatedData.success){
    return res.status(400).json({errors: validatedData.error.issues.map(err => err.message) });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if Admin already exists
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const newAdmin = new Admin({ firstName, lastName, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully", newAdmin });
  } catch (err) {
    console.error("Error during Admin signup:", err);
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        const isPasswordValid = await bcrypt.compare(password, admin.password) ;

        if (!admin || !isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //jwt code kaam karta hai ki yeh ek token generate karta hai jo Admin ko authenticate karne ke liye use hota hai

       const token = jwt.sign({
        id: admin._id,
       }, config.JWT_ADMIN_PASSWORD,
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
    res.status(200).json({ message: "Login successful", admin, token });
    } catch (err) {
        console.error("Error during Admin login:", err);
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