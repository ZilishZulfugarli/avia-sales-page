let cardContainer = document.querySelector(".card-container");
let holidayContainer = document.querySelector(".holiday-card-container");
let popHotelContainer = document.querySelector(".hotel-cards");
let hotelContainer = document.querySelector(".hotel-card");
let hotelDetail = document.querySelector(".container");
let wishlistContainer = document.querySelector(".search .wishlist");
let recentFlights = document.querySelector(".recent-search");


function isIndexPage() {
    return window.location.href.includes("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
    if (isIndexPage()) {
        ListCities();
        ListRecommendCities();
        listHotelsPop();
        
        displayWishlist();
    addToWishlist();
    }
});




document.addEventListener("DOMContentLoaded", () => {
    listHotels();
    listHotelDetail();


    

})

var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];

var searchButton = document.getElementById("searchButton");
var departureInput = document.getElementById("departureInput");
var arrivalInput = document.getElementById("arrivalInput");
var dateInput = document.getElementById("dateInput");

var mainSearchButton = document.getElementById("search-button");


// mainSearchButton.addEventListener("click", () => {
//         var departureValue = departureInput.value;
//         var arrivalValue = arrivalInput.value;
//         var dateValue = dateInput.value;
//         var selectedDate = new Date(dateValue);

//         var year = selectedDate.getFullYear();
//         var month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
//         var day = selectedDate.getDate().toString().padStart(2, '0');

//         var formattedDate = `${year}${month}${day}`;

//       const url = `http://localhost:4000/flights?origin=${departureValue}&destination=${arrivalValue}&date=${formattedDate}`;


//       window.location.href = url;

// })

async function ListCities() {

    let res = await fetch("http://localhost:4000/popularcities");
    let data = await res.json();

    if (!res.ok) {
        throw new Error("Sheher tapilmadi!")
    }

    if (Array.isArray(data) && data) {
        cardContainer.innerHTML = "";
        data.forEach(city => {
            cardContainer.innerHTML += `
        
            <div class="col" id="col">
                <div id="background" style="background: url(${city.image})">
                    <div class="destination-details">
                        <div class="destination-name" id="destination-name" style="display: block;">${city.destinationName}</div>
                        <div class="show" id="show">
                            <p class="from">from</p>
                            <p class="destination-price">$${city.destinationPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        
        `
        });
    }
}

async function ListRecommendCities() {

    let res = await fetch("http://localhost:4000/plancities");
    let data = await res.json();

    if (!res.ok) {
        throw new Error("Sheher tapilmadi!")
    }

    if (Array.isArray(data) && data) {
        holidayContainer.innerHTML = "";
        data.forEach(city => {
            holidayContainer.innerHTML += `
        
            <div class="holiday-col">
                    <a href="">
                        <img src="${city.image}" alt="">
                        <div class="holiday-details">
                            <div class="holiday-name">
                                <p class="country-name">${city.destinationName}</p>
                                <p class="country-code">4D3N</p>
                            </div>
                            <div class="holiday-price">$899</div>
                        </div>
                    </a>
            </div>
        
        `
        });
    }
}

async function listHotelsPop() {
    let res = await fetch("http://localhost:4000/popularhotels");
    let data = await res.json();

    if (!res.ok) {
        throw new Error("Sheher tapilmadi!");
    }

    if (Array.isArray(data) && data) {
        popHotelContainer.innerHTML = "";
        data.forEach(hotel => {
            popHotelContainer.innerHTML += `
                <div class="hotel-col">
                    <div class="hotel-card">
                        <img src="${hotel.image}" alt="">
                        <div class="hotel-details">
                            <div class="hotel-details-row">
                                <p class="hotel-description">${hotel.hotelDescription}</p>
                                <p class="hotel-name">${hotel.hotelName}</p>
                                <p class="hotel-price">$${hotel.hotelPrice}/night</p>
                            </div>
                            <i data-hotel-id="${hotel.id}" data-hotel-name="${hotel.hotelName}" data-hotel-price="${hotel.hotelPrice}" class="fa-regular fa-heart my-heart" onclick="addToWishlist(event)" style="cursor: pointer;"></i>
                        </div>
                        <div class="hotel-rating">
                            <div class="hotel-star">
                                <i class="fa-solid fa-star star"></i>
                                <p class="star-point">${hotel.hotelRating.starPoint}</p>
                            </div>
                            <p class="hotel-review">(${hotel.hotelRating.hotelReview} reviews)</p>
                        </div>
                        <a href="./hotel-details.html?id=${hotel.id}" class="more-detail-button">
                            <p>more details</p>
                        </a>
                    </div>
                </div>
            `;
        });
    }
}

function addToWishlist(event) {

    let hotelId = event.target.getAttribute('data-hotel-id');

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.includes(hotelId)) {

        wishlist.push(hotelId);

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        displayWishlist();

    } else {
        const index = wishlist.indexOf(hotelId);

        if (index !== -1) {
            wishlist.splice(index, 1);

        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        displayWishlist();
        console.log(index)
    }
}

function displayWishlist() {
    const wishlistContainer = document.querySelector('.wishlist');
    wishlistContainer.innerHTML = '';

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist.forEach(hotelId => {
        const heartIcon = document.querySelector(`i[data-hotel-id="${hotelId}`);
        const hotelName = heartIcon.getAttribute('data-hotel-name');
        const hotelPrice = heartIcon.getAttribute('data-hotel-price');

        const wishlistItem = document.createElement('div');
        wishlistItem.classList.add('wishlist-items');
        wishlistItem.innerHTML = `
            <div class="wishlist-description">
                <div class="hotel-name">
                    <p>${hotelName}</p>
                </div>
                <div class="hotel-price">
                    <p>${hotelPrice}$</p>
                </div>
            </div>
            <button class="buy-button">
                Finish Buy
            </button>
            <button class="delete-button" data-hotel-id="${hotelId}">
                Delete
            </button>
        `;

        wishlistContainer.appendChild(wishlistItem);

        const deleteButton = wishlistItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            removeFromWishlist(hotelId);
        });
    });
}

function removeFromWishlist(hotelId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(hotelId);
    if (index !== -1) {
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        displayWishlist();
    }
}

displayWishlist();

async function listHotels() {

    let res = await fetch("http://localhost:4000/hotels");
    let data = await res.json();
    console.log(data)

    if (!res.ok) {
        throw new Error("Sheher tapilmadi!")
    }

    if (Array.isArray(data) && data) {
        hotelContainer.innerHTML = "";
        data.forEach(hotel => {
            hotelContainer.innerHTML += `
        
            <div class="hotel-col">
                    <div class="hotel-card">
                        <img src="${hotel.image}" alt="">
                        <div class="hotel-details">
                            <div class="hotel-details-row">
                                <p class="hotel-description">${hotel.hotelDescription}</p>
                                <p class="hotel-name">${hotel.hotelName}</p>
                                <p class="hotel-price">$${hotel.hotelPrice}/night</p>
                            </div>
                            <i class="fa-regular fa-circle-play video-play"></i>
                        </div>
                        <div class="hotel-rating">

                            <div class="hotel-star">
                                <i class="fa-solid fa-star star"></i>
                                <p class="star-point">${hotel.hotelRating.starPoint}</p>
                            </div>

                            <p class="hotel-review">(${hotel.hotelRating.hotelReview} reviews)</p>
                        </div>
                        <div class="more-detail-button">
                                <a href="./hotel-details.html?id=${hotel.id}"><p>more details</p></a>
                            </div>
                        

                    </div>
                </div>
        
        `
        });
    }
}

async function listHotelDetail() {

    let params = new URLSearchParams(window.location.search);
    let hotelId = params.get(`id`);

    let res = await fetch(`http://localhost:4000/hotel/${hotelId}`);
    let hotelData = await res.json();

    if (!res.ok) {
        throw new Error("Sheher tapilmadi!")
    }

    if (hotelData) {
        hotelDetail.innerHTML = "";
        hotelDetail.innerHTML += `
            <div class="header">
            <p>${hotelData.hotelName}</p>
            </div>

        <div class="hotel">
            <div class="details">
                <ul>
                    <li>${hotelData.hotelDescription}</li>
                    <hr>
                    <li>${hotelData.country}</li>
                    <hr>
                    <li>${hotelData.hotelRating.starPoint}</li>
                    <hr>
                    <h3>Price:$${hotelData.hotelPrice}</h3>
                </ul>
            </div>
            <div class="image">
                <img src="${hotelData.image}" alt="">
            </div>
            
        </div>

        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24313.193102206504!2d49.86191203711517!3d40.383387125127946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d1f85d9b639%3A0xeda9cb854d1b6add!2sBaku%20Marriott%20Hotel%20Boulevard!5e0!3m2!1sen!2saz!4v1697356026503!5m2!1sen!2saz" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        
        `

    }
}

// async function hotelSearch(){
//     let res = await fetch("http://localhost:4000/hotelsearch")
//     let data = res.json();
//     console.log(res)
// }




