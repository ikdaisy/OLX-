import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    password:{type:String},
    cpassword:{type:String},
    place:{type:String},
    profile:{type:String},
    address:{type:String},
    phone:{type:String},
    pincode:{type:String},
    otp:{type:Number}
})
export default mongoose.model.Users||mongoose.model("User",userSchema)