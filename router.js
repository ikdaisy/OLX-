import Router from "express"
import * as rh from "./requestHandler.js"
import Auth from "./middleware/auth.js"
const router = Router()

router.route("/signup").post(rh.signUp)
router.route("/signin").post(rh.signIn)
//user 
router.route("/getuser/:id").get(rh.getUser)
router.route("/edituser/:_id").put(rh.editUser)
router.route("/deleteuser/:_id").delete(rh.deleteUser)
//index get all products
router.route("/getproducts").get(Auth,rh.getProducts)

//display product details
router.route("/getproductdetails/:_id").get(rh.getProductDetails)

//add product 
router.route("/addproduct").post(rh.addProduct);
//edit product 
router.route("/editproduct/:_id").put(rh.editProduct)
//delete product
router.route("/deleteproduct/:_id").delete(rh.deleteProduct)

//otp
router.route("/generateotp").post(rh.generateOTP)
router.route("/compareotp").post(rh.compareOTP)
router.route("/changepassword").post(rh.changePassword)

//wishlist
router.route("/addwishlist").post(rh.addToWishlist)
router.route("/getwishlist").get(rh.getWishlist)
router.route("/deletewishlist/:_id").delete(rh.deleteWishlist)

//booking
router.route("/addbooking").post(Auth,rh.addBooking)
//get Orders
router.route("/getorders/:_id").get(rh.getOrders)

router.route("/getsbookings/:_id").get(rh.getSBookings)

router.route("/rejectBooking").delete(rh.rejectBooking);
router.route("/acceptbooking").delete(rh.acceptBooking);









export default router