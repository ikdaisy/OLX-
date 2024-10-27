const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);

async function getProductDetails() {
  const res = await fetch(`http://localhost:3003/api/getproductdetails/${id}`)
  console.log(res);
  const product = await res.json()
  console.log(product);
    str=``

  product.images.map((image)=>{
    console.log(image);
    
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
        <p style="margin-bottom: 5px;"><img src="../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.webp" alt="" style="width: 15px;">Bank OfferGet 10% off upto ₹50 on first Flipkart UPI transaction on order of ₹250 and aboveT&C</p>

        <p style="margin-bottom: 2px;"><img src="../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.webp" alt="" style="width: 15px;">Bank Offer5% Cashback on Flipkart Axis Bank CardT&C</p>

  
    <span class="last-btn">
    <span class="last-btn" id="cart-btn">
        
        <!-- <button class="last-btn1" onclick="addToCart()">ADD TO CART</button> -->
        </span>
        <a href="./editProduct.html?id=${product._id}"><button class="edit-btn">EDIT</button></a>
         <a href=""><button class="delete-btn" onclick="deleteProduct('${product._id}')" >DELETE</button></a>

        
    </span>
    </div>
   `
  
  
}
getProductDetails()

function changePic(image){
    document.getElementById("main-image").src=image

}

async function deleteProduct(id){
  console.log(id); 
  if(confirm("Are you sure to delete this product?")){
      const res=await fetch(`http://localhost:3003/api/deleteproduct/${id}`,{
          method:"DELETE"
      })

      if(res.status==200){
          let data=await res.json()
          alert(data.msg)
          // getProductDetails()
          window.location.href="../index.html"
      }
      else{
          alert("Failed To Delete");
      }
  }  
}