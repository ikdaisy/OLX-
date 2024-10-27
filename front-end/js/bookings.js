const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);

async function getSellerBookings() {
    const res = await fetch(`http://localhost:3003/api/getsbookings/${id}`)
    console.log(res);
    const data = await res.json()
    console.log(data);
    str=``
    data.map((sbook)=>{
        str+=`<div>
            <div class="men-card">
          <div class="image">
            <img src="${sbook.product.images[0]}" alt="">
          </div>
          <div class="content">
             <span class="product-name" style="font-size:25px;">${sbook.product.pname}</span><br>
             <span class="price" style="font-size:18px;">Category: ${sbook.product.category}</span><br>
             <span class="price" style="font-size:18px;">Buyer Name:${sbook.buyer.username} </span><br>
             <span class="price" style="font-size:18px;">Buyer Phone:${sbook.buyer.phone} </span><br>
             <span class="price" style="font-size:18px;">Address:${sbook.buyer.place} </span><br>

             <button class="" style=" color: white;margin-top: 10px;background-color: green;border: none;border-radius: 10px;padding: 10px 20px;" onclick="acceptBooking('${sbook.product._id}')">ACCEPT</button>
             <button onclick="rejectBooking('${sbook._id}')">REJECT</button>
             
            
          </div>
          
        </div>

        
        </div>`
    })
    document.getElementById("products").innerHTML=str
    

    
    
}
getSellerBookings()

async function acceptBooking(_id) {
    console.log(_id);
    
    fetch(`http://localhost:3003/api/acceptbooking`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({_id})
      }).then(async(res)=>{
            const result=await res.json();
            if(res.status==201){
                alert(result.msg);

            }else{
                alert("error");
            }
        }). catch ((error)=>{
            console.log(error);
            
        })
}

async function rejectBooking(_id) {
    console.log(_id);
    
    fetch(`http://localhost:3003/api/rejectBooking`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({_id})
      }).then(async(res)=>{
            const result=await res.json();
            if(res.status==201){
                alert(result.msg);
            }else{
                alert("error");
            }
        }). catch ((error)=>{
            console.log(error);
            
        })
}