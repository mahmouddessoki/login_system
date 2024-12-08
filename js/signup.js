let userName = document.getElementById("floatingName")
let userEmail = document.getElementById('floatingEmail')
let userPass = document.getElementById('floatingPassword')
// let userRePass = document.getElementById('floatingCmfPassword')
let registerInputs = document.querySelector(".signup-form")
let allInputs = document.querySelectorAll(".signup-form input")
let btnSignup = document.querySelector(".btn-signup")
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || []

let allRegx = [
    /^[a-zA-Z]{3,20}[a-zA-Z 0-9]*$/,
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
    if (target.id === "floatingName") {
        currentRegex = allRegx[0]
    } else if (target.id === "floatingEmail") {
        currentRegex = allRegx[1]
    } else if (target.id === "floatingPassword") {
        currentRegex = allRegx[2]
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

    if (!(userName.value && userEmail.value &&
        userPass.value)) {
        for (let i = 0; i < allInputs.length; i++) {
            checkInput(allInputs[i])
        }
        
        isValid = false
        Swal.fire({
            html: `<p class="text-capitalize">All <span class='fw-bold'>Inputs</span> are required to sign up and must be valid.</p>`,
            icon: 'error',
           
        });
       
    } else {
        for (let i = 0; i < allInputs.length; i++) {
            if (!allRegx[i].test(allInputs[i].value.trim())) {
                isValid = false;
                Swal.fire({
                    text: 'All Inputs are required to sign up and must be valid.',
                    icon: 'error',
                });
                break
            }
        }

        return isValid


    }


}


function addUser(){
   index = allUsers.findIndex(function(user) {
    return user.email.trim() === userEmail.value.trim()
   })
   
    if (index != -1) {
        Swal.fire({
            html: '<p class="text-capitalize">This <span class="fw-bold">email</span> is already in use.</p>',
            icon: 'info',
        });
    }else {
        const user = {
            name: userName.value.trim(),
            email: userEmail.value.trim(),
            password: userPass.value.trim(),

        }

        allUsers.push(user)
        localStorage.setItem("allUsers", JSON.stringify(allUsers))

        // window.location.href = "./index.html"
        Swal.fire({
            html: '<p class="text-capitalize">successfully registered</p>',
            icon: 'success',
        });
    }
}



document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault()
})





registerInputs.addEventListener('input', function (e) {

    checkInput(e.target)


})


btnSignup.addEventListener('click', function () {
    
    if (validate()) {
       addUser();
       

    }

})



