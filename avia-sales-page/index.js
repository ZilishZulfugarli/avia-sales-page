var hamburgerIcon = document.querySelector(".hamburger-icon");
let sideMenu = document.getElementById("side-menu");

hamburgerIcon.addEventListener("click", ()=>{
    if(sideMenu.style.display === "none"){
        sideMenu.style.display = "block";
    }
    else{
        sideMenu.style.display = "none";
    }
})