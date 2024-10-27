function moveImage() {
    const image = document.getElementById("bottomLeftImage");
    const audio = document.getElementById("airplaneSound");
    let posX = 10; // Starting left position
    let posY = 10; // Starting bottom position
    const interval = 20; // Milliseconds between each move step
    const speedX = 8.4; // Horizontal speed
    const speedY = 4; // Vertical speed

    // Fade in the airplane and play sound
    image.style.opacity = "1"; // Make the airplane visible
    audio.play(); // Start audio

    const moveInterval = setInterval(() => {
        posX += speedX; // Update X position
        posY += speedY; // Update Y position
        image.style.left = posX + "px"; // Update left position
        image.style.bottom = posY + "px"; // Update bottom position

        // Start fading out near the top-right corner
        if (posX >= window.innerWidth * 0.9 && posY >= window.innerHeight * 0.9) {
            image.style.transition = "opacity 3s ease"; // Set fade-out transition
            image.style.opacity = "0"; // Start fade-out effect

            // Stop audio 0.5 seconds after fade-out completes
            setTimeout(() => {
                audio.pause(); // Stop audio
                audio.currentTime = 0; // Reset audio to the start
            }, 1600); // 3 seconds for fade-out + 0.5 seconds extra
        }

        // Continue moving fully out of view
        if (posX >= window.innerWidth && posY >= window.innerHeight) {
            clearInterval(moveInterval); // Stop movement after full fade-out
            setTimeout(() => {
                image.style.display = "none"; // Hide completely after fade-out
            }, 3000); // Matches the fade-out duration
        }
    }, interval);
}

window.onload = function() {
    moveImage();
    document.getElementById("flightNumberInput").value = "";
};

function searchFlight() {
    const flightNumber = document.getElementById("flightNumberInput").value;
    const apiUrl = `https://api.magicapi.dev/api/v1/aedbx/aerodatabox/flights/Number/${flightNumber}?withAircraftImage=true&withLocation=true`;

    fetch(apiUrl, {
       method: "GET",
       headers: {
        "accept": "application/json",
        "x-magicapi-key": "cm2qrk87w0001m903iklnapqv" // Updated header key
       }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Full response data:", data); // Log full response to understand structure

        // Check if data has the expected items
        if (Array.isArray(data) && data.length > 0) {
            displayFlightData(data[0]); // Pass only the first item if data is an array
        } else if (data.items && data.items.length > 0) {
            displayFlightData(data.items[0]); // If data has items array, use its first element
        } else {
            alert("No flight information available for this flight number.");
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation", error);
        alert("Flight information could not be retrieved. Please try again.");
    });
}


function displayFlightData(flightData) {
    const flightInfo = document.querySelector(".flight-info"); // Select existing flight-info div
    flightInfo.innerHTML = ""; // Clear previous content if any

    console.log("Full flightData object:", flightData);

    const departureAirport = flightData?.departure?.airport?.name || "N/A";
    const departureScheduledTime = flightData?.departure?.scheduledTime?.utc || "N/A";
    const arrivalAirport = flightData?.arrival?.airport?.name || "N/A";
    const arrivalScheduledTime = flightData?.arrival?.scheduledTime?.utc || "N/A";
    const last_updated_utc = flightData?.lastUpdatedUtc || "N/A";
    const altitude = flightData?.location?.altitude?.meter || "N/A";
    const groundSpeed = flightData?.location?.groundSpeed?.kmPerHour || "N/A";
    const status = flightData?.status || "N/A";
    const isCargo = flightData?.isCargo || "N/A";
    const lat = flightData?.location?.lat;
    const lon = flightData?.location?.lon;
    const aircraftImageUrl = flightData?.aircraft?.image?.url || "";
    const aircraftModel = flightData?.aircraft?.model || "N/A";
    const aircraftRegistration = flightData?.aircraft?.reg;

    // Display flight information in the existing flight-info div
    flightInfo.innerHTML = `
    <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
            <h2 style="text-align: center">Flight Information:</h2><br>
            <table class="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Flight Number:</th>
                        <td>${flightData.number || "N/A"}</td>
                    </tr>
                    <tr>
                        <th scope="row">Departure airport and scheduled time (UTC):</th>
                        <td>${departureAirport} at ${departureScheduledTime}</td>
                    </tr>
                    <tr>
                        <th scope="row">Arrival airport and scheduled time (UTC):</th>
                        <td>${arrivalAirport} at ${arrivalScheduledTime}</td>
                    </tr>
                    <tr>
                        <th scope="row">Status:</th>
                        <td>${status}</td>
                    </tr>
                    <tr>
                        <th scope="row">Last updated UTC:</th>
                        <td>${last_updated_utc}</td>
                    </tr>
                    <tr>
                        <th scope="row">Latitude and Longitude:</th>
                        <td>${lat || "N/A"}, ${lon || "N/A"}</td>
                    </tr>
                    <tr>
                        <th scope="row">Actual Location:</th>
                        <td><span id="location-placeholder">Loading...</span></td>
                    </tr>
                    <tr>
                        <th scope="row">Aircraft Model:</th>
                        <td>${aircraftModel}</td>
                    </tr>
                    <tr>
                        <th scope="row">Registration:</th>
                        <td>${aircraftRegistration}</td>
                    </tr>
                    <tr>
                        <th scope="row">Altitude:</th>
                        <td>${altitude} m</td>
                    </tr>
                    <tr>
                        <th scope="row">Ground speed:</th>
                        <td>${groundSpeed} km/h</td>
                    </tr>
                    ${isCargo === true || isCargo === "true" ? `
                        <tr>
                            <th scope="row">Flight Type:</th>
                            <td><strong>Cargo Flight</strong></td>
                        </tr>` : ""}
                    <tr>
                        <th scope="row">Aircraft image:</th>
                        <td style="padding:0">${aircraftImageUrl ? `<img src="${aircraftImageUrl}" alt="Airplane Image" style="width: 100%; height: auto;">` : "Not available"}</td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
    `;

    flightInfo.style.color = 'yellow';

    // Display location if lat/lon are available
    if (!isNaN(lat) && !isNaN(lon)) {
        getPlaceFromCoordinates(lat, lon);
    } else {
        document.getElementById("location-placeholder").textContent = "Location not available.";
        console.log("Latitude and/or Longitude are not valid or available.");
    }
}


function getPlaceFromCoordinates(lat, lon) {
    const apiKey = 'AIzaSyBHd6QXPEb55mCzIx9FjucTLiXM8_ZqXxE'; // Google API Key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const locationElement = document.getElementById("location-placeholder");
            if (data.results && data.results.length > 0) {
                const place = data.results[0].formatted_address;
                locationElement.textContent = place;
            } else {
                locationElement.textContent = "No location found for these coordinates.";
            }
        })
        .catch(error => {
            console.error("There was a problem with the geocoding request:", error);
            document.getElementById("location-placeholder").textContent = "Location not available.";
        });
} 

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("airplaneSound");
    audio.volume = 1.0; // Set the volume to maximum (1.0 is the max)
});