const emailTarget = document.querySelector("#email")
const passwordTarget = document.querySelector("#password")
const repasswordTarget = document.querySelector("#repassword")
const upperCaseRegex = /[A-Z]/;
const lowerCaseRegex = /[a-z]/;
const specialCharRegex = /[!@#$%^&*)(+=._-]/;
const numberRegex = /[0-9]/;
const upperTarget = document.querySelector("#upper");
const lowerTarget = document.querySelector("#lower");
const numberTarget = document.querySelector("#number");
const lengthTarget = document.querySelector("#length");
const charTarget = document.querySelector("#char");
const matchTarget = document.querySelector("#match");
const btn = document.querySelector("button")

const getFieldValues = () => {
    return {
        email: emailTarget.value,
        password: passwordTarget.value,
        repassword: repasswordTarget.value
    }
}

const signupSubmit = () => {
    const values = getFieldValues()
    console.log(values);
    if(upperCaseRegex.test(values.password) && lowerCaseRegex.test(values.password) && specialCharRegex.test(values.password) && numberRegex.test(values.password)){
        fetch('http://localhost:3333/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })  
        .catch((res) => {
            console.warn(res)
        }); 
    }
    else{
        console.log("Password requirements didn't match!");
    }     
}
const passwordValidator = () => {
    const values = getFieldValues()
   
    if(values.password === values.repassword) matchTarget.checked = true
    else matchTarget.checked = false 
    
    if(values.password.length >= 8 ) lengthTarget.checked = true 
    else lengthTarget.checked = false
    
    if (upperCaseRegex.test(values.password)) upperTarget.checked = true
    else upperTarget.checked = false

    if(lowerCaseRegex.test(values.password)) lowerTarget.checked = true
    else lowerTarget.checked = false

    if(specialCharRegex.test(values.password)) charTarget.checked = true 
    else charTarget.checked = false

    if(numberRegex.test(values.password)) numberTarget.checked = true 
    else numberTarget.checked = false 
    if(upperCaseRegex.test(values.password) && lowerCaseRegex.test(values.password) && specialCharRegex.test(values.password) && numberRegex.test(values.password)){
        if(values.password == values.repassword){
            btn.removeAttribute("disabled")
            btn.classList.remove("btn-danger");
            btn.classList.add("btn-success");
        }
    }
    else {
        btn.classList.add("btn-danger");
    }
}
passwordTarget.addEventListener("input", passwordValidator)
repasswordTarget.addEventListener("input", passwordValidator)