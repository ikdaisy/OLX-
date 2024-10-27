import userSchema from './models/user.model.js';
import productSchema from "./models/product.model.js";
import wishlistSchema from "./models/wishlist.model.js"
import bookingSchema from "./models/booking.model.js"


import bcrypt from 'bcrypt';
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "aea83a68a8ccdf",
      pass: "745739627f7a80",
    },
  });

const {sign}=pkg;

export async function signUp(req,res) {
  
    try{

        const {email,username,password,cpassword,place,address,phone,pincode,profile} = req.body;
        // console.log(profile);
        
        if(!(email&& username&& password&& cpassword && place&& address&& phone&& pincode))
            return res.status(404).send({msg:"Fields are empty"})
        if(password !== cpassword)
            return res.status(404).send({msg:"Password not matching"})
        bcrypt
        .hash(password,10)
        .then((hashedPassword)=>{
            userSchema
            .create({email,username,password:hashedPassword,place,address,phone,pincode,profile})
            .then(()=>{
                console.log("Success");
                return res.status(201).send({msg:"Successs"})
            })
            .catch((error)=>{
                console.log("Faliure");
                return res.status(404).send({msg:"Not registered"})
            })
        })
    }
    catch(error){
        return res.status(404).send({msg:error})

    }  
   
}

//sign in 
export async function signIn(req,res){
    try {
        const {email,password}=req.body
    // console.log(email,password);

    if(!(email&&password))
        return res.status(404).send({msg:"Fields are empty"})
    const user= await userSchema.findOne({email})
    // console.log(user);
    if(!user){
        return res.status(404).send({msg:"Invalid email"})
    }
    const success = await bcrypt.compare(password,user.password)
    // console.log(success);
    if(!success)
        return res.status(404).send({msg:"Invalid password"})
    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    // console.log(token);
    res.status(200).send({msg:"Successfully logged in",token})
    } catch (error) {
        console.log(error);  
    }
}


//get products (index page)

export async function getProducts(req,res) {
   try{
      
    if(req.user!=null){
    // console.log(req.user);
    const _id = req.user.userId
    const products1=await productSchema.find({sellerId:{$ne:_id}})
    // console.log(products1);
    const user = await userSchema.findOne({_id})
    // console.log(user.profile);
    return res.status(200).send({products1,profile:user.profile,id:_id})
    }
    else{
    const products=await productSchema.find();
    // console.log(products);
    
    return res.status(403).send({products,msg:"Please login again"})

        
    }
   }
   catch(error){
    res.status(404).send(error)
   }  
}

//get user data
export async function getUser(req,res) {
    try {
        const {id}=req.params;
        const data=await userSchema.findOne({_id:id});
        const userProducts= await productSchema.find({sellerId:id})
        const count=await bookingSchema.countDocuments({sellerId:id});
        // console.log(userProducts);
        
        res.status(200).send({data,userProducts,count});
    } catch (error) {
        res.status(404).send(error)
    }
}

//edit user data
export async function editUser(req,res) {
    try {
        const {_id}=req.params;
    const {...user}=req.body;
    const data=await userSchema.updateOne({_id},{$set:{...user}});
    res.status(201).send(data);
    } catch (error) {
        res.status(404).send(error);
    }
    
}

//delete user

export async function deleteUser(req,res) {
    try {
        const _id=req.params
        console.log(_id);
        userSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Deleted"})
            // window.location.reload()
    
        }).catch((error)=>{
            console.log(error);
            
        })
    } catch (error) {
        console.log(error);  
    }
    
}

// ADD PRODUCT
export async function addProduct(req,res) {
    try {
        const {pname,price,category,description,images,sellerId} = req.body;
        if(!(pname&&price&&category&&description&&images))
            return res.status(404).send({msg:"Fields are empty"})
       
        
        productSchema
            .create({pname,price,category,description,images,sellerId})
            .then(()=>{
                console.log("success");
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                console.log("faliure");
                return res.status(404).send({msg:"product not added"})
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

// EDIT PRODUCT
export async function editProduct(req,res) {
    try{
        const _id=req.params
    const {...product}=req.body
    const data = await productSchema.updateOne({_id},{$set:{...product}})
    res.status(200).send({msg:"Successfully updated"})
    }
    catch(error){
        res.status(404).send({msg:error})
    } 
}

// DELETE PRODUCT

export async function deleteProduct(req,res) {
    try {
        const _id=req.params
        console.log(_id);
        productSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Deleted successfully"})
            // window.location.reload()
    
        }).catch((error)=>{
            console.log(error);
            
        })
    } catch (error) {
        console.log(error);  
    }
    
}



//view product details
export async function getProductDetails(req,res) {
   try {
    const _id= req.params
    const data = await productSchema.findOne({_id})
   res.status(200).send(data)
   } catch (error) {
        return res.status(404).send(error)
   }
    
    
}

//FOROGT PASSWORD

//generate otp for forgot password
export async function generateOTP(req,res) {
   try {
     // res.send("otp reached")
     const {email}=req.body
     console.log(email);
     
     //check if the user with the email exists or not
     const user=await userSchema.findOne({email})
     if(!user)
         return res.status(404).send({msg:"Invalid Email"})
 
     //otp generation code 
     let digits = '0123456789'; 
     let otp = ''; 
     let len = digits.length 
     for (let i = 0; i < 6; i++) { 
         otp += digits[Math.floor(Math.random() * len)]; 
     } 
     console.log(otp);
     //update otp in the db 
     userSchema.updateOne({email},{$set:{otp}}).then(async()=>{
         const info = await transporter.sendMail({
             from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
             to: `${email}`, // list of receivers
             subject: "OTP", // Subject line
             text: "VERIFICATION", // plain text body
             html: `<b>Your OTP is ${otp}</b>`, // html body
           });
         
           console.log("Message sent: %s", info.messageId)
           res.status(200).send({msg:"OTP has been sent to the email successfully"})
 

     }).catch((error)=>{
         console.log(error);
         
     })
    
   } catch (error) {
    console.log(error);
   }
  
}

export async function compareOTP(req,res) {
    const {otp}=req.body;
    console.log(otp);
    const user=await userSchema.findOne({otp})
    // console.log(user);
    //check the otp in the database and entered otp
    if(otp!=user.otp)
        return res.status(404).send({msg:"Failed"})

    await userSchema.updateOne({otp},{$set:{otp:null}}).then(()=>{
        res.status(200).send({msg:"Success"})

    }).catch((error)=>{
        console.log(error);
        
    })
     
}

export async function changePassword(req,res) {

    const {newPassword,userEmail}=req.body
    //update the new password (hash before updating)
    bcrypt.hash(newPassword,10).then((hashedPassword)=>{
        userSchema.updateOne({email:userEmail},{$set:{password:hashedPassword}}).then(()=>{
               res.status(200).send({msg:"Your password has been succesfully updated"})
             }).catch((error)=>{
                console.log(error);
                
             })

    })
  
}

//   WISHLIST

export async function addToWishlist(req,res) {
   const {...data}=req.body;
   wishlistSchema.create({...data}).then(()=>{
    res.status(201).send({msg:"Success"})
   }).catch((error)=>{
    res.status(404).send({msg:"Failed"})
   })
 
}

export async function getWishlist(req,res) {
    try {
        // console.log("haha");
        
        
        const data = await wishlistSchema.find()
        // console.log(data);
        
        res.status(200).send(data)
       } catch (error) {
            return res.status(404).send(error)
       }

    
}

export async function deleteWishlist(req,res) {
    try {
        const _id=req.params
        console.log(_id);
        wishlistSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Deleted successfully"})
            // window.location.reload()
    
        }).catch((error)=>{
            console.log(error);
            
        })
    } catch (error) {
        console.log(error);  
    }
    
}

// Booking

export async function addBooking(req,res){
    const {product}=req.body;
    // console.log(req.user);
    const _id=req.user.userId;
    const buyer=await userSchema.findOne({_id},{username:1,place:1,phone:1})
    console.log(buyer);
    
    bookingSchema.create({sellerId:product.sellerId,product,buyerId:_id,buyer})
    .then(()=>{
        return res.status(201).send({msg:"Booking Successfull"});
    })
    .catch((error)=>{
        return res.status(404).send({msg:"Booking failed"});
    }) 
}

export async function getOrders(req,res) {
   console.log(req.params);
   
    try{
    const {_id}=req.params;
    console.log(_id);
    
    const data = await bookingSchema.find({buyerId:_id})
    res.status(200).send(data)
   }
   catch(error){
    return res.status(404).send(error)

   }
}

export async function getSBookings(req,res) {
    console.log(req.params);
    
    try {
        const {_id}=req.params;
        const bookings=await bookingSchema.find({sellerId:_id});
        console.log(bookings);
        
        res.status(200).send(bookings);
    } catch (error) {
        res.status(404).send(error)
    }
}


export async function acceptBooking(req,res) {
    try {
        const {_id}=req.body;
        console.log(_id);
        const result=await productSchema.deleteOne({_id})
        console.log(result);
        
        return res.status(201).send({msg:"Booking accepted!!"});
    } catch (error) {
        return res.status(404).send({msg:error})
    }  
}

export async function rejectBooking(req,res) {
    try {
        const {_id}=req.body;
        console.log(_id);
        const result=await bookingSchema.deleteOne({_id})
        return res.status(201).send({msg:"Booking rejected!!"})           
    } catch (error) {
        return res.status(404).send({msg:error})
    }  
}