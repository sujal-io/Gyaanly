import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import courseRoute from './routes/course.route.js'
import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'

const app = express()
dotenv.config()

app.use(express.json());
app.use(cookieParser());
app.use
(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true,
}));
app.use(express.urlencoded({ extended: true })); 

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

);

const port = process.env.PORT || 3000
const DB_URI = process.env.MONGO_URI;

try{
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');
} catch(err){
  console.error('Error connecting to MongoDB:', err);
}

//defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);



//cloudinary configuration code ka kaam hai ki yeh humare images ko cloudinary
//  pe upload karega aur wahan se hum unhe access kar sakte hain
cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret,
    });

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
