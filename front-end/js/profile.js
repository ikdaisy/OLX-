const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
// console.log(id);

async function getUser(){
    const res= await fetch(`http://localhost:3003/api/getuser/${id}`)
    console.log(res);
    const data = await res.json()
    console.log(data.count);
    
    // console.log(data);
    document.getElementById("left").innerHTML=`<img  src="${data.data.profile}" alt="">
            <div class="username">${data.data.username}</div>
            
            <div class="details">
                <h5>Email: </h5>
                <div class="email">${data.data.email}</div>
               
            </div>
            <div class="details">
                <h5>Phone: </h5>
                <div class="phone">${data.data.phone}</div>
               
            </div>
            <div class="details">
                <h5>Place: </h5>
                <div class="place">${data.data.place}</div>
               
            </div>
            <div class="details">
                <h5>Address: </h5>
                <div class="address">${data.data.address}</div>
               
            </div>
            <div class="details">
                <h5>Pincode: </h5>
                <div class="pincode">${data.data.pincode}</div>
               
            </div>
              

            

            <a href="./editProfile.html?id=${data.data._id}"><button class="edit-btn">EDIT</button></a>
            <div>
                <button  class="logout-btn" onclick="deleteUser('${data.data._id}')">DELETE ACCOUNT</button>
            </div>

        </div>`
    str=``
    console.log(data.userProducts);
    
        data.userProducts.map((product)=>{
            
            
            str+=`            <div class="men-cards" id="products">
                <a class="asd" href="./product.html?id=${product._id}">
                    <div>
                    <div class="men-card">
                  <div class="image">
                    <img src="${product.images[0]}" alt="">
                  </div>
                  <div class="content">
                     <span class="product-name">${product.pname}</span><br>
                     <span class="price">₹${product.price}</span><br>
                    
                  </div>
                  
                </div>
                </div> </a>
        

          
            </div>`
        })
        document.getElementById("btns").innerHTML=`<div class="bookings"><span class="count">${data.count}</span>
       <a href="../pages/booking.html?id=${id}"> <button id="bookings" class="order-btn">BOOKINGS</button></a>
     </div>
<div style=" height:50px; "><a href="../pages/orders.html?id=${id}"><button class="order-btn">ORDERS</button></a></div>`

    
    document.getElementById("right").innerHTML=str;

   

} 
getUser()

async function deleteUser(id){
    console.log(id); 
    if(confirm("Are you sure to delete this user?")){
        const res=await fetch(`http://localhost:3002/api/deleteuser/${id}`,{
            method:"DELETE"
        })

        if(res.status==200){
            let data=await res.json()
            alert(data.msg)
            getUser()
        }
        else{
            alert("Failed To Delete");
        }
    }  
}