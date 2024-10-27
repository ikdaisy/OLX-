document.getElementById("form").addEventListener("submit",async (e)=>{
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await fetch("http://localhost:3003/api/signin",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    }).then(async (res)=>{
        console.log(res);
        const data = await res.json()
        if(res.status==200){
            localStorage.setItem("Token",data.token)
            alert(data.msg)
            window.location.href="../index.html"
        }
        else{
            alert(data.msg)
        }
        
    }).catch((error)=>{
        console.log(error);
        
    })

})