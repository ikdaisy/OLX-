const token=localStorage.getItem("Token")
// console.log(token);
 let result

async function getProducts() {
    // alert("hii")
    const res=await fetch("http://localhost:3003/api/getproducts",{headers:{
    "authorization" : `Bearer ${token}`}})
    console.log(res);
    result=await res.json();
    console.log(result);
    str=``;
   
if(res.status==200){
    document.getElementById("profile").innerHTML=` <div  class="container">
            <img src="${result.profile}" alt="" id="profileImage" class="profile-image" onclick="popup()">
             <div class="dropdown" id="dropdownMenu">
               
                <div class="dropdown-option" ><a href="./pages/profile.html?id=${result.id}"><button>View Profile</button></a></div>
                <div class="dropdown-option"><button onclick="logout()" id="hover">LOGOUT</button></div>           </div>
        </div>
        
         `
         
         document.getElementById("sell").innerHTML=`<a href="./pages/addProduct.html?id=${result.id}"><button class="sell" >+SELL</button></a>`

        
         result.products1.map((product)=>{
             str+=`<a class="asd" href="./pages/allProducts.html?id=${product._id}">
                 <div>
                 <div class="men-card">
               <div class="image">
                 <img src="${product.images[0]}" alt="">
               </div>
               <div class="content">
                  <span class="product-name">${product.pname.substring(0,16)}</span><br>
                  <span class="price">₹${product.price}</span><br>
                 
               </div>
               
             </div>
             </div> </a>
             
             `
         })
     
         
     document.getElementById("products").innerHTML=str;
}
else if(res.status==403){
    result.products.map((product)=>{
        console.log(product);
        
        str+=`<a class="asd" href="./pages/allProducts.html?id=${product._id}">
            <div>
            <div class="men-card">
          <div class="image">
            <img src="${product.images[0]}" alt="">
          </div>
          <div class="content">
             <span class="product-name">${product.pname.substring(0,16)}</span><br>
             <span class="price">₹${product.price}</span><br>
            
          </div>
          
        </div>
        </div> </a>
        
        `
    })
document.getElementById("products").innerHTML=str;

}
else{
    console.log(result.msg);
}

//search code

document.getElementById("search").addEventListener('keyup',async(e)=>{
    try {
        const res=await fetch("http://localhost:3003/api/getproducts",{headers:{
            "authorization" : `Bearer ${token}`}})
        const products=await res.json();
        console.log(products);
        
        str=``;
        products.products.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())).map((product)=>{
            str+=`<a class="asd" href="./pages/allProducts.html?id=${product._id}">
            <div>
            <div class="men-card">
          <div class="image">
            <img src="${product.images[0]}" alt="">
          </div>
          <div class="content">
             <span class="product-name">${product.pname.substring(0,16)}</span><br>
             <span class="price">₹${product.price}</span><br>
            
          </div>
          
        </div>
        </div> </a>
            
        `
        })

        document.getElementById("products").innerHTML=str;
    } catch (error) {
        console.log(error);
    }
})



}



getProducts()




function popup() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown if clicked outside
window.addEventListener('click', (event) => {
    if (!profileImage.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

function logout() {
  
    
    localStorage.removeItem("Token");
    // window.location.href="./index.html"
    window.location.reload()
}

function message(){
   if( confirm("Please login to add products!!"))
        window.location.href="./pages/signin.html"
}