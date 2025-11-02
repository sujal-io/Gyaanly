import jwt from "jsonwebtoken";
import config from "../config.js";

//userMiddleware ka kaam hai ki yeh har request mein check karega ki kya user authenticated hai ya nahi
function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; //authorization header se token milta hai

  // console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No tokens provided" });
  }
  const token = authHeader.split(" ")[1];

  // console.log("Token:" + token)

  try {
    const decoded = jwt.verify(token, config.JWT_USER_PASSWORD); //decoded mein token ka data milega aur usme user ka id hoga
    // console.log("Decoded:" + decoded)
    req.userId = decoded.id;                 //req.user aur decoded me difference hai, req.user humne middleware me banaya hai
    // console.log(num);                                     // jisme hum user ka id store kar rahe hain aur decoded me token ka data hota hai
    next();
  } catch (err) {
    console.error("Error in user middleware:", err);
    return res.status(401).json({ errors: "Invalid token" });
  }
}

export default userMiddleware;
