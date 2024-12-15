let signUpForm = document.forms[0]
let signupName = document.getElementById("signupName")
let signupEmail = document.getElementById("signupEmail")
let signupPassword = document.getElementById("signupPassword")
let signupErrAlert = document.getElementById("form-error-alert")
let signupSucAlert = document.getElementById("form-success-alert")
let emailExistAlert = document.getElementById("email-exist-error")
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || []





function addUser() {

    let user = {
        name: signupName.value.trim(),
        email: signupEmail.value.trim(),
        password: signupPassword.value

    }
    if (checkAllInputs() && !isExist(user)) {
        allUsers.push(user)
        localStorage.setItem("allUsers", JSON.stringify(allUsers))
        signupSucAlert.classList.replace("d-none", "d-block")
        setTimeout(function () {
            window.location.href = "./signin.html"
        }, 1500)
    } else {
        signupSucAlert.classList.replace("d-block", "d-none")

    }



}






signUpForm.addEventListener('submit', function (e) {
    e.preventDefault()
    addUser()

})
signUpForm.addEventListener('input', function (e) {

    if (e.target == signupName) {
        validateInput(/^[a-zA-Z]{3,}$/, e.target)
    } else if (e.target == signupEmail) {
        validateInput(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, e.target)
    } else if (e.target == signupPassword) {
        validateInput(/^(?=.*[A-Z])(?=.*\d).{8,}$/, signupPassword)
    }


})

function validateInput(regex, elem) {

    let pattern = regex
    if (pattern.test(elem.value)) {
        elem.classList.add("is-valid")
        elem.classList.remove("is-invalid")


        return true

    } else {
        elem.classList.add("is-invalid")
        elem.classList.remove("is-valid")

        return false

    }

}

function checkAllInputs() {
    let nameValidation = validateInput(/^[a-zA-Z]{3,}$/, signupName)
    let emailValidation = validateInput(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, signupEmail)
    let passValidation = validateInput(/^(?=.*[A-Z])(?=.*\d).{8,}$/, signupPassword)
    if (nameValidation && emailValidation && passValidation) {
        signupErrAlert.classList.replace("d-block", "d-none")

        return true
    } else {

        signupErrAlert.classList.replace("d-none", "d-block")
        return false
    }

}

function isExist(userObj) {
    let index = allUsers.findIndex(function (user) {
        return userObj.email == user.email
    })
    if (index != -1) {
        emailExistAlert.classList.replace("d-none", "d-block")
        console.log("exist");

        return true
    } else {
        emailExistAlert.classList.replace("d-block", "d-none")
        console.log("not exist");

    }
    return false

}
let flag = false
showPass.addEventListener('click',function(){
    if (flag == false) {
        signupPassword.type = "text";
        showPass.classList.replace("fa-eye", "fa-eye-slash");
        flag=true

    }else {
        signupPassword.type = "password";
        showPass.classList.replace("fa-eye-slash","fa-eye");
        flag = false
    }
})
