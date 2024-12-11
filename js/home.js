if (localStorage.getItem("loggedInUser") == null) {
    window.location.href = "./signin.html"
}
let homeWelcome = document.getElementById("home-welcome")
let logOutBtn = document.querySelector(".logout-btn button")

let allUsers = JSON.parse(localStorage.getItem("allUsers")) || []


let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

homeWelcome.innerHTML = `Welcome ${loggedInUser.name}`

logOutBtn.addEventListener('click', function () {
    logOut()
})


function logOut() {
    localStorage.removeItem("loggedInUser")
    window.location.href = "./signin.html"

}