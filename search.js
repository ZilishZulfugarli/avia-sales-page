let flight = document.querySelector(".flights");

function isSearchPage() {
    return window.location.href.includes("resultpage.html");
}

document.addEventListener("DOMContentLoaded", () => {
    if (isSearchPage()) {
        listFlights();
        listAirports();
    }
});

var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];

var searchButton = document.getElementById("searchButton");
var departureInput = document.getElementById("departureInput");
var arrivalInput = document.getElementById("arrivalInput");
var dateInput = document.getElementById("dateInput");

var onestop = document.getElementById("one-stop");
var twostop = document.getElementById("two-stop");
var showmore =document.getElementById("show-more");
showmore.style.display = "none";

let filteredFlights = [];

searchButton.addEventListener("click", async function listFlights() {

    showmore.style.display = "block";

    var departureValue = departureInput.value;
    var arrivalValue = arrivalInput.value;
    var dateValue = dateInput.value;
    var selectedDate = new Date(dateValue);

    var year = selectedDate.getFullYear();
    var month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    var day = selectedDate.getDate().toString().padStart(2, '0');


    var formattedDate = `${year}${month}${day}`;
    


    let res = await fetch(`http://localhost:4000/flights?origin=${departureValue}&destination=${arrivalValue}&date=${formattedDate}`)
    let data = await res.json();



    if (!res.ok) {
        throw new Error("Sheher tapilmadi!")
    }

    onestop.addEventListener("change", function () {
        showmore.style.display = "none";
        if (onestop.checked) {
            filteredFlights = data.OTA_AirDetailsRS.FlightDetails.filter(
                (flight) => flight.$.FLSFlightLegs === "1"
            );

            flight.innerHTML = `
            <p> ${filteredFlights.length} out of ${filteredFlights.length
                } Result</p>`;
            for (let index = 0; index < filteredFlights.length; index++) {
                console.log(filteredFlights);
                const inputDateString1 = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSArrivalDateTime;

                const date1 = new Date(inputDateString1);

                function formatTimeAsShortPM(date) {
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    const period = hours >= 12 ? 'pm' : 'am';

                    hours = hours % 12 || 12;

                    minutes = minutes.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${period}`;
                }


                const arrivalTime = formatTimeAsShortPM(date1);

                //aaaasasasadadasdasdasdad

                const inputDateString = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSDepartureDateTime;

                const date = new Date(inputDateString);

                function formatTimeAsShortPM(date) {
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    const period = hours >= 12 ? 'pm' : 'am';

                    hours = hours % 12 || 12;

                    minutes = minutes.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${period}`;
                }

                const departureTime = formatTimeAsShortPM(date);


                const durationString = data.OTA_AirDetailsRS.FlightDetails[index]
                    .$.TotalTripTime;

                function convertDurationToShortHoursAndMinutes(durationString) {
                    const duration = /PT(\d+)H(\d+)M/.exec(durationString);

                    if (duration) {
                        const hours = parseInt(duration[1]);
                        const minutes = parseInt(duration[2]);

                        let formattedTime = '';

                        if (hours > 0) {
                            formattedTime += hours + 'h';
                        }

                        if (minutes > 0) {
                            formattedTime += ' ' + minutes + 'm';
                        }

                        return formattedTime.trim();
                    } else {
                        return "Invalid duration format";
                    }
                }

                const formattedArrivalTime = convertDurationToShortHoursAndMinutes(durationString);
                flight.innerHTML += `
            <div class="flight-card">
                              <div class="airlane-side">
                                  <img src="images/turkishairlanes.png" alt="">
                                  <p>${data.OTA_AirDetailsRS.FlightDetails[index]
                        .FlightLegDetails[0].MarketingAirline[0].$.CompanyShortName
                    }</p>
                              </div>
                              <div class="flight-side">
                                  <div class="departure-detail">
                                      <p class="time-text">${departureTime}</p>
                                      <p class="from-country">${filteredFlights[index].$.FLSDepartureCode}</p>
                                  </div>
                                  <div class="flight-duration">
                                      <i class="fa-solid fa-plane"></i>
                                      <p>${formattedArrivalTime}, 1-stop</p>
                                  </div>
                                  <div class="arrival-detail">
                                      <p class="endtime-text">${arrivalTime}</p>
                                      <p class="to-country">${filteredFlights[index].$.FLSArrivalCode}</p>
                                  </div>
                              </div>
                              <div class="price-side">
                                  <p>$723</p>
                              </div>
                          </div>`
            }
        } else {
            listFlights();
        }
    });
    
    twostop.addEventListener("change", function () {
        showmore.style.display = "none";
        if (twostop.checked) {
            filteredFlights = data.OTA_AirDetailsRS.FlightDetails.filter(
                (flight) => flight.$.FLSFlightLegs === "2"
            );

            flight.innerHTML = `
            <p> ${filteredFlights.length} out of ${filteredFlights.length
                } Result</p>`;
            for (let index = 0; index < filteredFlights.length; index++) {
                console.log(filteredFlights);
                const inputDateString1 = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSArrivalDateTime;

                const date1 = new Date(inputDateString1);

                function formatTimeAsShortPM(date) {
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    const period = hours >= 12 ? 'pm' : 'am';

                    hours = hours % 12 || 12;

                    minutes = minutes.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${period}`;
                }


                const arrivalTime = formatTimeAsShortPM(date1);

                //aaaasasasadadasdasdasdad

                const inputDateString = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSDepartureDateTime;

                const date = new Date(inputDateString);

                function formatTimeAsShortPM(date) {
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    const period = hours >= 12 ? 'pm' : 'am';

                    hours = hours % 12 || 12;

                    minutes = minutes.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${period}`;
                }

                const departureTime = formatTimeAsShortPM(date);


                const durationString = data.OTA_AirDetailsRS.FlightDetails[index]
                    .$.TotalTripTime;

                function convertDurationToShortHoursAndMinutes(durationString) {
                    const duration = /PT(\d+)H(\d+)M/.exec(durationString);

                    if (duration) {
                        const hours = parseInt(duration[1]);
                        const minutes = parseInt(duration[2]);

                        let formattedTime = '';

                        if (hours > 0) {
                            formattedTime += hours + 'h';
                        }

                        if (minutes > 0) {
                            formattedTime += ' ' + minutes + 'm';
                        }

                        return formattedTime.trim();
                    } else {
                        return "Invalid duration format";
                    }
                }

                const formattedArrivalTime = convertDurationToShortHoursAndMinutes(durationString);
                flight.innerHTML += `
            <div class="flight-card">
                              <div class="airlane-side">
                                  <img src="images/turkishairlanes.png" alt="">
                                  <p>${data.OTA_AirDetailsRS.FlightDetails[index]
                        .FlightLegDetails[0].MarketingAirline[0].$.CompanyShortName
                    }</p>
                              </div>
                              <div class="flight-side">
                                  <div class="departure-detail">
                                      <p class="time-text">${departureTime}</p>
                                      <p class="from-country">${filteredFlights[index].$.FLSDepartureCode}</p>
                                  </div>
                                  <div class="flight-duration">
                                      <i class="fa-solid fa-plane"></i>
                                      <p>${formattedArrivalTime}, 2-stop</p>
                                  </div>
                                  <div class="arrival-detail">
                                      <p class="endtime-text">${arrivalTime}</p>
                                      <p class="to-country">${filteredFlights[index].$.FLSArrivalCode}</p>
                                  </div>
                              </div>
                              <div class="price-side">
                                  <p>$723</p>
                              </div>
                          </div>`
            }
        } else {
            listFlights();
        }
    });



    if (data) {
        let showFlights = 9;
        flight.innerHTML = "";

        flight.innerHTML += `
            <p> 10 out of ${data.OTA_AirDetailsRS.FLSResponseFields[0].$.FLSResultCount
            } Result</p>`
            
             
        for (let index = 0; index <= showFlights; index++) {



            // if data.OTA_AirDetailsRS.FlightDetails[index].$.FLSFlightLegs == legsCount.value 

            const inputDateString1 = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSArrivalDateTime;

            const date1 = new Date(inputDateString1);

            function formatTimeAsShortPM(date) {
                let hours = date.getHours();
                let minutes = date.getMinutes();
                const period = hours >= 12 ? 'pm' : 'am';

                hours = hours % 12 || 12;

                minutes = minutes.toString().padStart(2, '0');

                return `${hours}:${minutes} ${period}`;
            }


            const arrivalTime = formatTimeAsShortPM(date1);

            //aaaasasasadadasdasdasdad

            const inputDateString = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSDepartureDateTime;

            const date = new Date(inputDateString);

            function formatTimeAsShortPM(date) {
                let hours = date.getHours();
                let minutes = date.getMinutes();
                const period = hours >= 12 ? 'pm' : 'am';

                hours = hours % 12 || 12;

                minutes = minutes.toString().padStart(2, '0');

                return `${hours}:${minutes} ${period}`;
            }

            const departureTime = formatTimeAsShortPM(date);


            const durationString = data.OTA_AirDetailsRS.FlightDetails[index]
                .$.TotalTripTime;

            function convertDurationToShortHoursAndMinutes(durationString) {
                const duration = /PT(\d+)H(\d+)M/.exec(durationString);

                if (duration) {
                    const hours = parseInt(duration[1]);
                    const minutes = parseInt(duration[2]);

                    let formattedTime = '';

                    if (hours > 0) {
                        formattedTime += hours + 'h';
                    }

                    if (minutes > 0) {
                        formattedTime += ' ' + minutes + 'm';
                    }

                    return formattedTime.trim();
                } else {
                    return "Invalid duration format";
                }
            }

            const formattedArrivalTime = convertDurationToShortHoursAndMinutes(durationString);




            flight.innerHTML += `        
                    
                    <div class="flight-card">
                        <div class="airlane-side">
                            <img src="images/turkishairlanes.png" alt="">
                            <p>${data.OTA_AirDetailsRS.FlightDetails[index]
                    .FlightLegDetails[0].MarketingAirline[0].$.CompanyShortName
                }</p>
                        </div>
                        <div class="flight-side">
                            <div class="departure-detail">
                                <p class="time-text">${arrivalTime}</p>
                                <p class="from-country">${data.OTA_AirDetailsRS.FlightDetails[index].$.FLSDepartureCode}</p>
                            </div>
                            <div class="flight-duration">
                                <i class="fa-solid fa-plane"></i>
                                <p>${formattedArrivalTime}, ${data.OTA_AirDetailsRS.FlightDetails[index].$.FLSFlightLegs}-stop</p>
                            </div>
                            <div class="arrival-detail">
                                <p class="endtime-text">${departureTime}</p>
                                <p class="to-country">${data.OTA_AirDetailsRS.FLSResponseFields[0].$.FLSDestinationCode}</p>
                            </div>
                        </div>
                        <div class="price-side">
                            <p>$723</p>
                        </div>
                    </div>
                    
            
            `
            filteredFlights = data.OTA_AirDetailsRS.FlightDetails;

            // }


        }
        showmore.addEventListener("click", ()=>{
            flight.innerHTML = "";

            flight.innerHTML += `
            <p> ${data.OTA_AirDetailsRS.FLSResponseFields[0].$.FLSResultCount
            } out of ${data.OTA_AirDetailsRS.FLSResponseFields[0].$.FLSResultCount
            } Result</p>`
            for (let index = 0; index <= data.OTA_AirDetailsRS.FLSResponseFields[0].$.FLSResultCount -1; index++) {



                // if data.OTA_AirDetailsRS.FlightDetails[index].$.FLSFlightLegs == legsCount.value 
    
                const inputDateString1 = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSArrivalDateTime;
    
                const date1 = new Date(inputDateString1);
    
                function formatTimeAsShortPM(date) {
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    const period = hours >= 12 ? 'pm' : 'am';
    
                    hours = hours % 12 || 12;
    
                    minutes = minutes.toString().padStart(2, '0');
    
                    return `${hours}:${minutes} ${period}`;
                }
    
    
                const arrivalTime = formatTimeAsShortPM(date1);
    
                //aaaasasasadadasdasdasdad
    
                const inputDateString = data.OTA_AirDetailsRS.FlightDetails[index].$.FLSDepartureDateTime;
    
                const date = new Date(inputDateString);
    
                function formatTimeAsShortPM(date) {
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    const period = hours >= 12 ? 'pm' : 'am';
    
                    hours = hours % 12 || 12;
    
                    minutes = minutes.toString().padStart(2, '0');
    
                    return `${hours}:${minutes} ${period}`;
                }
    
                const departureTime = formatTimeAsShortPM(date);
    
    
                const durationString = data.OTA_AirDetailsRS.FlightDetails[index]
                    .$.TotalTripTime;
    
                function convertDurationToShortHoursAndMinutes(durationString) {
                    const duration = /PT(\d+)H(\d+)M/.exec(durationString);
    
                    if (duration) {
                        const hours = parseInt(duration[1]);
                        const minutes = parseInt(duration[2]);
    
                        let formattedTime = '';
    
                        if (hours > 0) {
                            formattedTime += hours + 'h';
                        }
    
                        if (minutes > 0) {
                            formattedTime += ' ' + minutes + 'm';
                        }
    
                        return formattedTime.trim();
                    } else {
                        return "Invalid duration format";
                    }
                }
    
                const formattedArrivalTime = convertDurationToShortHoursAndMinutes(durationString);
    
    
    
    
                flight.innerHTML += `        
                        
                        <div class="flight-card">
                            <div class="airlane-side">
                                <img src="images/turkishairlanes.png" alt="">
                                <p>${data.OTA_AirDetailsRS.FlightDetails[index]
                        .FlightLegDetails[0].MarketingAirline[0].$.CompanyShortName
                    }</p>
                            </div>
                            <div class="flight-side">
                                <div class="departure-detail">
                                    <p class="time-text">${arrivalTime}</p>
                                    <p class="from-country">${data.OTA_AirDetailsRS.FlightDetails[index].$.FLSDepartureCode}</p>
                                </div>
                                <div class="flight-duration">
                                    <i class="fa-solid fa-plane"></i>
                                    <p>${formattedArrivalTime}, ${data.OTA_AirDetailsRS.FlightDetails[index].$.FLSFlightLegs}-stop</p>
                                </div>
                                <div class="arrival-detail">
                                    <p class="endtime-text">${departureTime}</p>
                                    <p class="to-country">${data.OTA_AirDetailsRS.FLSResponseFields[0].$.FLSDestinationCode}</p>
                                </div>
                            </div>
                            <div class="price-side">
                                <p>$723</p>
                            </div>
                        </div>
                        
                
                `
                filteredFlights = data.OTA_AirDetailsRS.FlightDetails;
                showmore.style.display = "none"
    
                // }
    
    
            }
        })
    }


    else {
        flight.innerHTML = "";
        flight.innerHTML += `<p>Salammm</p>`
    }
    var searchDetails = {
        departure: departureValue,
        arrival: arrivalValue,
        date: dateValue,

    };


    savedSearches.unshift(searchDetails);

    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));



});

async function listAirports() {
    fetch(`http://localhost:4000/airports`).then(x => x.json()).then(data => console.log(data))
}