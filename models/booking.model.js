import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    product:{type:Object},
    buyer:{type:Object},
    buyerId:{type:String},
    sellerId:{type:String}
   
})
export default mongoose.model.bookings||mongoose.model("booking",bookingSchema)