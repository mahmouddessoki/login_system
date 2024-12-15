let homeDemo = document.getElementById("home-welcome")
let logoutBtn = document.getElementById("logout")
let loggedName = localStorage.getItem("LoggedName") || null
if (loggedName) {
    homeDemo.innerHTML = `Welcome, ${loggedName}`
} else {
    window.location.href = "./signin.html"
}

logoutBtn.addEventListener('click',function(){
    localStorage.removeItem("LoggedName")
    window.location.href = "./signin.html"

})