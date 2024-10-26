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
};

function searchFlight() {
    const flightNumber = document.getElementById("flightNumberInput").value;
    const apiUrl = `https://aerodatabox.p.rapidapi.com/flights/Number/${flightNumber}?withAircraftImage=false&withLocation=true`;

    fetch(apiUrl, {
       method: "GET",
       headers: {
        "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
        "x-rapidapi-key": "7b9ac5ecd9msh9b73602d1653c0ap1e16cajsn942e05cca554"
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
    const resultsContainer = document.getElementById("searchContainer");
    resultsContainer.innerHTML = ""; // Clear previous results

    const flightInfo = document.createElement("div");
    flightInfo.classList.add("flight-info");

    // Log the full flightData to inspect its structure
    console.log("Full flightData object:", flightData);

    // Check if departure and arrival data are available
    const departureAirport = flightData?.departure?.airport?.name || "N/A";
    const departureTime = flightData?.departure?.scheduledTimeLocal || "N/A";
    const arrivalAirport = flightData?.arrival?.airport?.name || "N/A";
    const arrivalTime = flightData?.arrival?.scheduledTimeLocal || "N/A";
    const last_updated_utc = flightData?.lastUpdatedUtc || "N/A";

    // Placeholder for lat/lon - adjust the path once we inspect the console output
    const lat = flightData?.location?.lat;
    const lon = flightData?.location?.lon;

    console.log("Latitude (before adjustment):", lat);
    console.log("Longitude (before adjustment):", lon);

    // Display flight information
    flightInfo.innerHTML = `
        <h2>Flight Information</h2>
        <p><strong>Flight Number:</strong> ${flightData.number || "N/A"}</p>
        <p><strong>Departure:</strong> ${departureAirport} at ${departureTime}</p>
        <p><strong>Arrival:</strong> ${arrivalAirport} at ${arrivalTime}</p>
        <p><strong>Last updated UTC:</strong> ${last_updated_utc}</p>
        <p><strong>Latitude and Longitude:</strong> ${lat || "N/A"}, ${lon || "N/A"}</p>
        <p><strong>Actual Location:</strong> <span id="location-placeholder">Loading...</span></p>
    `;

    flightInfo.style.color = 'yellow';
    resultsContainer.appendChild(flightInfo);

    // Geocode if lat and lon are defined and valid
    if (lat !== undefined && lon !== undefined && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
        getPlaceFromCoordinates(parseFloat(lat), parseFloat(lon));
    } else {
        document.getElementById("location-placeholder").textContent = "Location not available.";
        console.log("Latitude and/or Longitude are not valid or available.");
    }
}



function getPlaceFromCoordinates(lat, lon) {
    const apiKey = 'AIzaSyBHd6QXPEb55mCzIx9FjucTLiXM8_ZqXxE'; // Your Google API Key
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
                const place = data.results[0].formatted_address; // Full address
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
