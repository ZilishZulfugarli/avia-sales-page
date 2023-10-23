var hamburgerIcon = document.querySelector(".hamburger-icon");
let sideMenu = document.getElementById("side-menu");
let inputs = document.querySelector(".form-input");
var mainSearchButton = document.getElementById("search-button")


var searchButton = document.getElementById("searchButton");
var departureInput = document.getElementById("departureInput");
var arrivalInput = document.getElementById("arrivalInput");
var dateInput = document.getElementById("dateInput");


hamburgerIcon.addEventListener("click", () => {
    if (sideMenu.style.display === "none") {
        sideMenu.style.display = "block";
    }
    else {
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


let returnCheckbox = document.getElementById("return");

returnCheckbox.addEventListener("click", () => {
    inputs.innerHTML +=
        `
    <div class="inputs">
                            <div class="col4">
                                <fieldset>
                                    <legend style="right: 0;">Departure
                                    </legend>
                                    <input type="from" name="from" id="from" placeholder="Singapore (SIN)">
                                </fieldset>
                            </div>
                            <div class="col4">
                                <fieldset>

                                    <legend>Arrival</legend>
                                    <input type="to" name="to" id="to" placeholder="Singapore (SIN)">
                                </fieldset>
                            </div>
                            <div class="col4 date">
                                <fieldset>
                                    <legend>Date</legend>
                                    <input type="date" name="date" id="date" placeholder="Singapore (SIN)">
                                </fieldset>
                            </div>
                        </div>
    `
}, { once: true });

//SHOW RECENT FLIGHTS

recentFlights.innerHTML = "";

if (savedSearches.length === 0) {
    recentFlights.innerHTML +=
        `
        <div class="flight-container">
            <h3>No search flights</h3>
        </div>
        `;
} else {
    var recentSearches = savedSearches.slice(0, 2);

    recentSearches.forEach(function (search, index) {

        recentFlights.innerHTML +=
         `
                <div class="flight-container">
                    <div class="from-to">
                        <p class="flight-name">${search.departure}</p>
                        <i class="fa-solid fa-plane plane-icon"></i>
                        <p class="flight-name">${search.arrival}</p>
                    </div>
                    <p class="flight-info"><span class="depart">Depart on:</span> ${search.date}</p>
                </div>
        `
    });

}


document.addEventListener("DOMContentLoaded", () => {
    WishList();
});



var wishlistActiveBtn = document.querySelector(".wishlist-active-btn" , ".side-nav .wishlist-active-btn");
let wishlist = document.querySelector(".wishlist");

function WishList(){
    wishlistActiveBtn.addEventListener("click", () => {
        console.log(wishlist);
        wishlist.style.display = (wishlist.style.display === "flex") ? "none" : "flex";
    });
}

