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


let col = document.getElementById("col");
let destination = document.getElementById("destination-name");
let show = document.getElementById("show");

// col.addEventListener("touchstart", ()=>{
//         destination.style.display = "none"
//         show.style.display = "block"
// })

// col.addEventListener("touchend", ()=>{
//         destination.style.display = "block"
//         show.style.display = "none"
// })