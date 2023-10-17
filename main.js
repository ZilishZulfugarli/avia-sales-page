let cardContainer = document.querySelector(".card-container");
let holidayContainer = document.querySelector(".holiday-card-container");
let popHotelContainer = document.querySelector(".hotel-cards");
let hotelContainer = document.querySelector(".hotel-card"); 
let hotelDetail = document.querySelector(".container");
let from = document.querySelector(".from");
let to = document.querySelector(".to");
let date = document.querySelector(".date");



document.addEventListener("DOMContentLoaded", () => {
    ListCities();
    ListRecommendCities();
    listHotelsPop();
    listHotels();
    listHotelDetail();
    listFlights();
    listAirports();
})

async function listFlights(){
     fetch(`http://localhost:4000/flights`).then(x=>x.json()).then(data=>console.log(data))
}

async function listAirports(){
     fetch(`http://localhost:4000/airports`).then(x=>x.json()).then(data=>console.log(data))
}

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
        throw new Error("Sheher tapilmadi!")
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
                                <a href="./hotel-details.html?id=${hotel.id}"><p>more details</p></a>
                            </div>
                        

                    </div>
                </div>
        
        `
        });
    }
}

async function listHotelDetail() {

    let params=new URLSearchParams(window.location.search);
    let hotelId=params.get(`id`);

    let res = await fetch(`http://localhost:4000/hotel/${hotelId}`);
    let hotelData = await res.json();
    
    if (!res.ok) {
        throw new Error("Sheher tapilmadi!")
    }

    if(hotelData){
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