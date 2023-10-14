let cardContainer = document.querySelector(".card-container");
let holidayContainer = document.querySelector(".holiday-card-container")
let hotelContainer = document.querySelector(".hotel-cards")

document.addEventListener("DOMContentLoaded", () => {
    ListCities();
    ListRecommendCities();
    listHotels();
})

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

async function listHotels() {

    let res = await fetch("http://localhost:4000/hotels");
    let data = await res.json();

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
                            <p>more details</p>
                        </div>

                    </div>
                </div>
        
        `
        });
    }
}