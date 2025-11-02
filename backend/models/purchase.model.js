import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Types.ObjectId,
    ref:"User", 
  },
  courseId:{
    type: mongoose.Types.ObjectId,
    ref:"Course", 
  }

});

export const Purchase = mongoose.model("Purchase", purchaseSchema); //"User" model ka naam hai aur userSchema schema hai jo humne upar define kiya hai.
