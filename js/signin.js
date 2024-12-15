let signinForm = document.forms[0]
let changePass = document.getElementById("changePass")
let signinEmail = document.getElementById("signinEmail")
let signinPassword = document.getElementById("signinPassword")
let loginErrAlert = document.getElementById("login-error-alert")
let loginSucAlert = document.getElementById("login-success-alert")
let changePassErrorAlert = document.getElementById("changePassErrorAlert")
let changePassSucAlert = document.getElementById("changePassSucAlert")
let changePassOldPass = document.getElementById("changePassOldPass")
let changePassNewPass = document.getElementById("changePassNewPass")
let changePassEmail = document.getElementById("changePassEmail")

let allUsers = JSON.parse(localStorage.getItem("allUsers")) || []
let loggedName;





if (localStorage.getItem("userToRem")) {
    signinEmail.value = JSON.parse(localStorage.getItem("userToRem")).email
    signinPassword.value = JSON.parse(localStorage.getItem("userToRem")).password

}

function login() {
    let userToLog = {
        email: signinEmail.value,
        password: signinPassword.value
    }

    if (isExist(userToLog)) {
        if (remember.checked) {
            localStorage.setItem("userToRem", JSON.stringify(userToLog))
        }
        localStorage.setItem("LoggedName", loggedName)
        setTimeout(function () {
            window.location.href = "./index.html"
        }, 1500)
    }

}


function searchAboutUser(userToSearch) {
    let index = allUsers.findIndex(function (user) {
        return userToSearch.email == user.email && userToSearch.password == user.password
    })
    return index
}

function isExist(userObj) {
    let index = searchAboutUser(userObj)
    if (index != -1) {
        loginSucAlert.classList.replace('d-none', 'd-block')
        loginErrAlert.classList.replace('d-block', 'd-none')
        loggedName = allUsers[index].name
        return true
    } else {
        loginSucAlert.classList.replace('d-block', 'd-none')
        loginErrAlert.classList.replace('d-none', 'd-block')


    }
    return false

}


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


function changePassword() {
    let userToChange = {
        email: changePassEmail.value,
        password: changePassOldPass.value
    }
    if (changePassEmail.value == '' || changePassOldPass.value == ''
        || changePassNewPass.value == '') {
        changePassErrorAlert.classList.replace("d-none", "d-block")
        changePassErrorAlert.innerHTML = "all fields are required"
    } else {
        let index = searchAboutUser(userToChange)
        if (index == -1) {
            changePassErrorAlert.classList.replace("d-none", "d-block")
            changePassSucAlert.classList.replace("d-block", "d-none")

            changePassErrorAlert.innerHTML = "Not correct Email or Password"

        } else {
            if (validateInput(/^(?=.*[A-Z])(?=.*\d).{8,}$/, changePassNewPass)) {
                allUsers[index].password = changePassNewPass.value
                localStorage.setItem("allUsers", JSON.stringify(allUsers))
                changePassErrorAlert.classList.replace("d-block", "d-none")
                changePassSucAlert.classList.replace("d-none", "d-block")
            }


        }
    }
}


signinForm.addEventListener("submit", function (e) {
    e.preventDefault()
    login()

})

changePass.addEventListener('click', function () {
    changePassword()
})

changePassNewPass.addEventListener('input', function () {
    validateInput(/^(?=.*[A-Z])(?=.*\d).{8,}$/, changePassNewPass)
})
