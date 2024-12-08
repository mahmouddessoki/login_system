let loginInputs = document.querySelector(".login-form")
let userEmail = document.getElementById('floatingEmail')
let userPass = document.getElementById('floatingPassword')
let rem = document.getElementById("remember")
let allInputs = document.querySelectorAll(".login-form input:not(#remember)")
let btnSignIn = document.querySelector(".btn-login")
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
    if (target.id === "floatingEmail") {
        currentRegex = allRegx[0]
    } else if (target.id === "floatingPassword") {
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
        window.location.href = "./home.html"
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