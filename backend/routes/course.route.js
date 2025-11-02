import express from 'express';
import { buyCourses, courseDetails, createCourse, deleteCourse, getCourses, updateCourse } from '../controllers/course.controller.js';
import userMiddleware from '../middleware/user.mid.js';
import adminMiddleware from '../middleware/admin.mid.js';

const router = express.Router(); //yeh router banaya hai express ka aur iska kaam hai ki 
// yeh alag alag routes ko handle karega

router.post("/create",adminMiddleware,createCourse); //jab bhi /create route hit hoga, toh createCourse function chalega
router.put("/update/:courseId",adminMiddleware,updateCourse); 
router.delete("/delete/:courseId", adminMiddleware,deleteCourse);
router.get("/courses", getCourses);
router.get("/:courseId",courseDetails)

router.post("/buy/:courseId",userMiddleware, buyCourses);

export default router;