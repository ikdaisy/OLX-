document.getElementById('registrationForm').addEventListener('input', function () {
    validateForm();
});

function validateForm() {
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitBtn = document.getElementById('submitBtn');
    const errorElement = document.getElementById('passwordError');

    let isValid = true;

    if ( !password || !confirmPassword) {
        isValid = false;
    }

    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        errorElement.classList.remove('success');
        errorElement.classList.add('error');
        isValid = false;
    } else {
        errorElement.textContent = 'Passwords match';
        errorElement.classList.remove('error');
        errorElement.classList.add('success');
    }

    if (isValid) {
        submitBtn.classList.add('enabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('enabled');
        submitBtn.disabled = true;
    }
}

//when submit is clicked

const userEmail = localStorage.getItem("email")
console.log(userEmail);


document.getElementById("registrationForm").addEventListener("submit",async(e)=>{
    e.preventDefault()
    const newPassword=document.getElementById("password").value
    const newConfirmPassword=document.getElementById("confirmPassword").value
    // console.log(newPassword,newConfirmPassword);
    fetch("http://localhost:3003/api/changepassword",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({newPassword,newConfirmPassword,userEmail})
    }).then(async(res)=>{
        console.log(res);
        const data = await res.json()
        if(res.status==200){
            alert(data.msg)
            window.location.href="./signin.html"
        }
        else{
            alert(data.msg)
        }

        
    })

    


})