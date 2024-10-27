// alert("haha")
 async function generateOTP(){
    try {
        
   const email = document.getElementById("email").value;
   await fetch("http://localhost:3003/api/generateotp",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email})
   }).then(async(res)=>{
    console.log(res);
    const data = await res.json()
    console.log(data);
    
    if(res.status==200){
        //store email in the local storage 
        localStorage.setItem("email",email)
        alert(data.msg)
        window.location.href="./otp.html"
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