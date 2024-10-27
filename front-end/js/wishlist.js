async function fetchData() {
    const res=await fetch("http://localhost:3003/api/getwishlist")
    console.log(res);
    const data= await res.json()
    console.log(data);
    str=``
    // console.log(data[0].buyerId);
    data.map((dd)=>{
        console.log(dd.product._id);
        
        str+=` <div>
            <div class="men-card">
          <div class="image">
            <img src="${dd.product.images[0]}" alt="">
          </div>
          <div class="content">
             <span class="product-name">${dd.product.pname}</span><br>
             <span class="price">$${dd.product.price}</span><br>
             <button onclick="deleteProduct('${dd._id}','${dd.product._id}')" >DELETE</button>
            
          </div>
          
        </div>

        
        </div>`
    })
    document.getElementById("products").innerHTML=str
    
    
    
    
}
fetchData()


async function deleteProduct(id,ID) {
    console.log(ID);
    
    console.log(id); 
    if(confirm("Do you want to remove from wishlist?")){
        const res=await fetch(`http://localhost:3003/api/deletewishlist/${id}`,{
            method:"DELETE"
        })
  
        if(res.status==200){
            let data=await res.json()
            localStorage.removeItem(ID)
            alert(data.msg)
            // getProductDetails()
            window.location.href="../index.html"
           

        }
        else{
            alert("Failed To Delete");
        }
    }  
    
}