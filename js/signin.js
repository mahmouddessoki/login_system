let loginInputs = document.querySelector(".login-form")
let userEmail = document.getElementById('floatingEmail')
let userPass = document.getElementById('floatingPassword')
let rem = document.getElementById("remember")
let allInputs = document.querySelectorAll(".login-form input:not(#remember)")
let btnSignIn = document.querySelector(".btn-login")
let changePassInputs = document.querySelector(".modal-body form")
let passChangeBtn = document.getElementById("change")
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || []
let loggedInUser = localStorage.getItem("loggedInEmail") || null
let userToRem = JSON.parse(localStorage.getItem("userToRem")) || null


if (userToRem) {
    userEmail.value = userToRem.email
    userPass.value = userToRem.password
}

let allRegx = [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    /^[A-Z]+[a-zA-Z0-9!@#$%^&*()_+]*/
]

function checkInput(target) {
    let targetSiblings = Array.from(target.parentElement.children);
    let icons = targetSiblings.filter(function (el) {
        return el.classList.contains('fa-check') || el.classList.contains('fa-circle-exclamation')
    })
    let valid = icons[1]
    let inValid = icons[0]
    let curAlert = target.nextElementSibling
    target.classList.add("border-2")
    let currentRegex;
    if (target.id === "floatingEmail" || target.id == "user-email") {
        currentRegex = allRegx[0]
    } else if (target.id === "floatingPassword" || target.id == "old-password"
        || target.id == "new-password") {
        currentRegex = allRegx[1]
    }



    if (!currentRegex.test(target.value.trim())) {
        inValid.classList.remove('d-none')
        valid.classList.add('d-none')
        target.classList.add("border-danger")
        curAlert.classList.remove('d-none')
        target.classList.remove("border-success")



    } else {
        inValid.classList.add('d-none')
        valid.classList.remove('d-none')
        target.classList.add("border-success")
        target.classList.remove("border-danger")
        target.nextElementSibling.classList.add('d-none')






    }



}

function validate() {
    let isValid = true

    if (!(userEmail.value && userPass.value)) {
        for (let i = 0; i < allInputs.length; i++) {
            checkInput(allInputs[i])
        }
        isValid = false


    } else {
        for (let i = 0; i < allInputs.length; i++) {
            if (!allRegx[i].test(allInputs[i].value.trim())) {

                isValid = false;
                Swal.fire({
                    html: '<p class="text-capitalize">invalid <span class="fw-bold">email</span> or <span class="fw-bold">password</span></p>',
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Try , Again!'
                });
                break
            }
        }

        return isValid


    }


}



function loginUser() {
    userIndex = allUsers.findIndex(function (user) {
        return userEmail.value.trim() === user.email &&
            userPass.value.trim() === user.password
    })

    if (userIndex != -1) {
        localStorage.setItem("loggedInUser", JSON.stringify(allUsers[userIndex]))
        if (rem.checked) {
            localStorage.setItem("userToRem", JSON.stringify(allUsers[userIndex]))

        }
        window.location.href = "./index.html"
    } else {
        Swal.fire({
            html: '<p class="text-capitalize">invalid <span class="fw-bold">email</span> or <span class="fw-bold">password</span></p>',
            icon: 'error',
            showCancelButton: false,
        });
    }
}







document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault()
})





loginInputs.addEventListener('input', function (e) {
    if (e.target.id != "remember") checkInput(e.target)


})


btnSignIn.addEventListener('click', function () {

    if (validate()) {
        loginUser()

    }

})


changePassInputs.addEventListener('input', function (e) {
    checkInput(e.target)

})




changePassInputs.addEventListener('click', function (e) {
    if (e.target.classList.contains("fa-eye")) {

        e.target.parentElement.children[0].setAttribute("type", "text")

        e.target.nextElementSibling.classList.remove("d-none")
        e.target.classList.add("d-none")
    } else if (e.target.classList.contains("fa-eye-slash")) {
        e.target.parentElement.children[0].setAttribute("type", "password")

        e.target.previousElementSibling.classList.remove("d-none")
        e.target.classList.add("d-none")
    }







})


passChangeBtn.addEventListener('click', function (e) {
    let changePassForm = e.target.parentElement.previousElementSibling.children[0].children
    let formAlert1 = e.target.parentElement.previousElementSibling.children[1]
    let formAlert2 = e.target.parentElement.previousElementSibling.children[2]
    let formAlert3 = e.target.parentElement.previousElementSibling.children[3]
    let formAlert4 = e.target.parentElement.previousElementSibling.children[4]
    let email = changePassForm[0].children[0]
    let oldPass = changePassForm[1].children[0]
    let newPass = changePassForm[2].children[0]

    if (!(email.value.trim() && oldPass.value.trim() && newPass.value.trim())) {
        formAlert1.classList.remove("d-none")
        formAlert2.classList.add("d-none")
        formAlert3.classList.add("d-none")
        formAlert4.classList.add("d-none")
    } else if (!allRegx[0].test(email.value.trim()) || !allRegx[1].test(oldPass.value.trim())
        || !allRegx[1].test(newPass.value.trim())) {
        formAlert1.classList.add("d-none")
        formAlert2.classList.add("d-none")
        formAlert3.classList.add("d-none")
        formAlert4.classList.remove("d-none")
    } else {
        let userIndex = allUsers.findIndex(function (user) {
            return user.email == email.value.trim() &&
                user.password == oldPass.value
        })

        if (userIndex == -1) {
            formAlert1.classList.add("d-none")
            formAlert2.classList.add("d-none")
            formAlert3.classList.remove("d-none")
            formAlert4.classList.add("d-none")
        } else {
            allUsers[userIndex].password = newPass.value;
            localStorage.setItem("allUsers" , JSON.stringify(allUsers))
            formAlert1.classList.add("d-none")
            formAlert2.classList.remove("d-none")
            formAlert3.classList.add("d-none")
            formAlert4.classList.add("d-none")            

        }
    }







})


