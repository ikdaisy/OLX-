import mongoose from "mongoose";
const wishlistSchema = new mongoose.Schema({
    product:{type:Object},
    buyerId:{type:String}
   
})
export default mongoose.model.lists||mongoose.model("list",wishlistSchema)