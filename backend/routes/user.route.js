import express from 'express';
import { login, logout, purchased, signup } from '../controllers/user.controller.js';
import userMiddleware from '../middleware/user.mid.js';

const router = express.Router(); 

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout); //get use hua hai kyunki yeh ek simple request hai jo server se data mang rahi hai
router.get("/purchased",userMiddleware,purchased);

export default router;