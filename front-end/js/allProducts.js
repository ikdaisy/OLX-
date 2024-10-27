
const token=localStorage.getItem("Token")

const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
// console.log(id);
let product;
async function getProductDetails() {
  const res = await fetch(`http://localhost:3003/api/getproductdetails/${id}`)
  // console.log(res);
   product = await res.json()
  // console.log(product);
    str=``

  product.images.map((image)=>{
    // console.log(image);
    
    str+=`<div class="pro-card">
                <img src=${image} alt="no-image" onmouseover="changePic('${image}')">
             </div>`
  })
  document.getElementById("card").innerHTML=str;


  document.getElementById("products").innerHTML=` 
    <div class="pro-pic" >
        <img src="${product.images[0]}" alt="no image" id="main-image" >
    </div>
    <div class="pro-content" >
       
        <h4 style="color: rgb(123, 121, 121);margin-bottom: 10px; font-size: 15px;" id="category" >${product.category.toUpperCase()}</h4>
        <h4 style="font-size: 20px; margin-bottom: 15px;" id="title">${product.pname}</h4>
        <p style="font-size: medium;color: rgb(94, 91, 91);margin-bottom: 15px; text-align: justify;" id="description"> ${product.description}</p>
        
       
       <div style="word-spacing: 10px;margin-bottom: 10px;">
        <span style="font-weight: bold;font-size: 30px;" id="discount-price">$${product.price}</span>
        
       </div>
       <h4 style="margin-bottom: 10px;font-size: 17px; color:green;">Available offers</h4>
        <p style="margin-bottom: 5px;"><img src="" alt="" style="width: 15px;">Bank OfferGet 10% off upto ₹50 on first Flipkart UPI transaction on order of ₹250 and aboveT&C</p>

        <p style="margin-bottom: 2px;"><img src="" alt="" style="width: 15px;">Bank Offer5% Cashback on Flipkart Axis Bank CardT&C</p>

  
    <span class="last-btn">
    <span class="last-btn" id="cart-btn">
    </span>
        <button class="last-btn1" onclick="book()" >BOOK</button>

        
    </span>
    </div>
   `
  

   if(localStorage.getItem(id)){
    document.getElementById("cart-btn").innerHTML=` <a href="./wishlist.html"> <button class="last-btn1" >GO TO WISHLIST</button></a>`

  
  }
  else{
    document.getElementById("cart-btn").innerHTML=` <button class="last-btn1" onclick="addToWishlist('${product._id}')" >ADD TO WISHLIST</button>`

  
  
  }
  
}
getProductDetails()

function changePic(image){
    document.getElementById("main-image").src=image

}

async function addToWishlist(id){
  // console.log(id);
  const res = await fetch(`http://localhost:3003/api/getproductdetails/${id}`)
  // console.log(res);
  const product = await res.json()
  // console.log(product);
  buyerId=product.sellerId;
  // console.log(buyerId);
  
  fetch("http://localhost:3003/api/addwishlist",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({buyerId,product})
}).then(async(res)=>{
  console.log(res);
  const data= await res.json()
  if(res.status==201){
    localStorage.setItem(id,id)
    alert(data.msg)
    getProductDetails()

  }
  else{
    alert(data.msg)
  }
  
}).catch((error)=>{
  console.log(error);
  
})
  
}

async function book() {
  // console.log(product);
  try {
    await fetch("http://localhost:3003/api/addbooking",{
      method:"POST",
      headers:{"Content-Type":"application/json","authorization":`Bearer ${token}`},
      body:JSON.stringify({product})
    }).then(async(res)=>{
      console.log(res);
      const data= await res.json()
      if(res.status==201){
        alert(data.msg)
      }
      else{
        alert(data.msg)
      }

      
    }).catch((error)=>{
      console.log(error);
      
    })

    
  } catch (error) {
    console.log(error); 
  }
}



