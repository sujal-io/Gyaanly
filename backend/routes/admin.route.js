import express from 'express';

import { login, logout, signup } from '../controllers/admin.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout); //get use hua hai kyunki yeh ek simple request hai jo server se data mang rahi hai

export default router;