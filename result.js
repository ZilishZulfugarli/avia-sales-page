var hotelResults = document.querySelector(".show-hotels");
// import {addToWishlist} from 'main.js'
// import {displayWishlist} from 'main.js'


document.addEventListener("DOMContentLoaded", () => {
    
    hotelResult();
    // addToWishlist();
    // displayWishlist();
  
});

async function hotelResult() {
    
    let res = await fetch("http://localhost:4000/hotels");
    let data = await res.json();
    console.log(data);

    if (!res.ok) {
        throw new Error("Sheher tapilmadi!")
    }

    if (Array.isArray(data) && data) {
        
        hotelResults.innerHTML = "";
        data.forEach(hotel => {
            
            hotelResults.innerHTML += `
            
            <div class="hotels-card">
                    <img src="${hotel.image}" alt="">
                    <div class="hotel-result-details">
                        <div class="hotel-result-details-title">
                            <div class="hotel-result-details-title-result">
                                <p>${hotel.hotelName}</p>
                                <p>${hotel.hotelDescription}</p>
                                <div class="hotel-rating">
                                <i data-hotel-id="${hotel.id}" data-hotel-name="${hotel.hotelName}" data-hotel-price="${hotel.hotelPrice}" class="fa-regular fa-heart my-heart" onclick="addToWishlist" style="cursor: pointer;"></i>
                                <div class="hotel-star">
                                        <i class="fa-solid fa-star star" style="color: #FDBF00;"></i>
                                        <p class="star-point">${hotel.hotelRating.starPoint}</p>
                                    </div>
                                    <p class="hotel-review">(${hotel.hotelRating.hotelReview} reviews)</p>
                                    
                                </div>
                                <p class="hotel-price">$${hotel.hotelPrice}/night</p>
                                <a href="./hotel-details.html?id=${hotel.id}" class="more-detail-button">
                                    <p>View Details</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

        
        `
        
        });
    }
}