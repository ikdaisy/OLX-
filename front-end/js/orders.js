const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);

async function getOrders() {
    const res = await fetch(`http://localhost:3003/api/getorders/${id}`)
    // console.log(res);
    const data = await res.json()
    console.log(data);
    str=``
    data.map((orders)=>{
        console.log(orders);
        str+=` <div>
            <div class="men-card">
          <div class="image">
            <img src="${orders.product.images[0]}" alt="">
          </div>
          <div class="content">
             <span class="product-name" style="font-size:25px;">${orders.product.pname}</span><br>
             <span class="price" style="font-size:18px;">Category: ${orders.product.category}</span><br>
             <span class="price" style="font-size:18px;">Buyer Name: ${orders.buyer.username}</span><br>
             <span class="price" style="font-size:18px;">Buyer Phone: ${orders.buyer.phone}</span><br>
             <span class="price" style="font-size:18px;">Place: ${orders.buyer.place}</span><br>



            
            
          </div>
          
        </div>

        
        </div>
            `
        
    })
    document.getElementById("products").innerHTML=str;

    
    
    
}
getOrders()