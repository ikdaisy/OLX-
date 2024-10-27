// script.js
const inputs = document.getElementById("inputs");

inputs.addEventListener("input", function (e) {
    const target = e.target;
    const val = target.value;

    if (isNaN(val)) {
        target.value = "";
        return;
    }

    if (val != "") {
        const next = target.nextElementSibling;
        if (next) {
            next.focus();
        }
    }
});

inputs.addEventListener("keyup", function (e) {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key == "backspace" || key == "delete") {
        target.value = "";
        const prev = target.previousElementSibling;
        if (prev) {
            prev.focus();
        }
        return;
    }
});

function submitOTP(){
    const num1=document.getElementById("num1").value
    const num2=document.getElementById("num2").value
    const num3=document.getElementById("num3").value
    const num4=document.getElementById("num4").value
    const num5=document.getElementById("num5").value
    const num6=document.getElementById("num6").value
    console.log(num1,num2,num3,num4,num5,num6);
    otp=num1+num2+num3+num4+num5+num6;
    console.log(otp);
    fetch("http://localhost:3003/api/compareotp",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({otp})
    }).then(async(res)=>{
        console.log(res);
        const data = await res.json()
        if(res.status==200){
            alert(data.msg)
            window.location.href="./changePassword.html"

        }
        else{
            alert(data.msg)
        }
        

    }).catch((error)=>{

    })

    
    

}
