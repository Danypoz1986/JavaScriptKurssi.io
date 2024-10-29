const FLIGHT_INFO_CONTAINER = document.querySelector(".flight-info");

function moveImage() {
    const image = document.getElementById("bottomLeftImage");
    const audio = document.getElementById("airplaneSound");
    let posX = 10;
    let posY = 10;
    const interval = 20;
    const speedX = 8.4;
    const speedY = 4;

    image.style.opacity = "1";
    audio.play();

    const moveInterval = setInterval(() => {
        posX += speedX;
        posY += speedY;
        image.style.left = posX + "px";
        image.style.bottom = posY + "px";

        if (posX >= window.innerWidth * 0.9 && posY >= window.innerHeight * 0.9) {
            image.style.transition = "opacity 3s ease";
            image.style.opacity = "0";

            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 1600);
        }

        if (posX >= window.innerWidth && posY >= window.innerHeight) {
            clearInterval(moveInterval);
            setTimeout(() => {
                image.style.display = "none";
            }, 3000);
        }
    }, interval);
}

window.onload = function() {
    moveImage();

    document.getElementById("flightNumberInput").value = "";
    document.getElementById("flightRegInput").value = "";
    document.getElementById("flightCallSignInput").value = "";
    document.getElementById("flightIcao24Input").value = "";

    // Set "Number" radio button as checked by default and show its field
    document.getElementById("number").checked = true;
    toggleField(document.getElementById("number"), 'numberField');
};

function searchFlight() {
    FLIGHT_INFO_CONTAINER.innerHTML = "";
    const flightNumber = document.getElementById("flightNumberInput").value.trim();
    const flightReg = document.getElementById("flightRegInput").value.trim();
    const flightCallSign = document.getElementById("flightCallSignInput").value.trim();
    const flightIcao24 = document.getElementById("flightIcao24Input").value.trim();

    let apiUrl = "";

    if (document.getElementById("number").checked && flightNumber) {
        apiUrl = `https://aerodatabox.p.rapidapi.com/flights/Number/${flightNumber}?withAircraftImage=true&withLocation=true`;
        console.log("Searching by Number:", flightNumber);
    } else if (document.getElementById("reg").checked && flightReg) {
        apiUrl = `https://aerodatabox.p.rapidapi.com/flights/Reg/${flightReg}?withAircraftImage=true&withLocation=true`;
        console.log("Searching by Reg:", flightReg);
    } else if (document.getElementById("callSign").checked && flightCallSign) {
        apiUrl = `https://aerodatabox.p.rapidapi.com/flights/CallSign/${flightCallSign}?withAircraftImage=true&withLocation=true`;
        console.log("Searching by call sign:", flightCallSign);
    } else if (document.getElementById("icao24").checked && flightIcao24) {
        apiUrl = `https://aerodatabox.p.rapidapi.com/flights/Icao24/${flightIcao24}?withAircraftImage=true&withLocation=true`;
        console.log("Searching by icao24:", flightIcao24);
    } else {
        alert("Please select a search type and enter a search term.");
        return;
    }

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": "7b9ac5ecd9msh9b73602d1653c0ap1e16cajsn942e05cca554"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            displayFlightData(data);
        } else if (data.items && data.items.length > 0) {
            displayFlightData(data.items);
        } else {
            alert("No flight information available for this search.");
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        alert("Flight information could not be retrieved. Please try again.");
    });
}

function displayFlightData(flightDataArray) {
    FLIGHT_INFO_CONTAINER.innerHTML = `
        <div class="row justify-content-center mb-4">
            <div class="col-12 col-md-8 col-lg-6">
                <h2 style="text-align: center">Flight Information:</h2>
            </div>
        </div>
    `;

    const dataArray = Array.isArray(flightDataArray) ? flightDataArray : [flightDataArray];

    dataArray.forEach((flightData, index) => {
        const departureAirport = flightData?.departure?.airport?.name || "N/A";
        const departureScheduledTime = flightData?.departure?.scheduledTime?.utc || "N/A";
        const arrivalAirport = flightData?.arrival?.airport?.name || "N/A";
        const arrivalScheduledTime = flightData?.arrival?.scheduledTime?.utc || "N/A";
        const last_updated_utc = flightData?.lastUpdatedUtc || "N/A";
        const altitude = flightData?.location?.altitude?.meter || "N/A";
        const groundSpeed = flightData?.location?.groundSpeed?.kmPerHour || "N/A";
        const status = flightData?.status || "N/A";
        const isCargo = flightData?.isCargo ?? "N/A";
        const lat = flightData?.location?.lat;
        const lon = flightData?.location?.lon;
        const aircraftImageUrl = flightData?.aircraft?.image?.url || "";
        const aircraftModel = flightData?.aircraft?.model || "N/A";
        const aircraftRegistration = flightData?.aircraft?.reg;

        const locationPlaceholderId = `location-placeholder-${index}`;

        FLIGHT_INFO_CONTAINER.innerHTML += `
        <div class="row justify-content-center mb-4">
            <div class="col-12 col-md-8 col-lg-6">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr><th scope="row">Flight Number:</th><td>${flightData.number || "N/A"}</td></tr>
                        <tr><th scope="row">Departure airport and scheduled time (UTC):</th><td>${departureAirport} at ${departureScheduledTime}</td></tr>
                        <tr><th scope="row">Arrival airport and scheduled time (UTC):</th><td>${arrivalAirport} at ${arrivalScheduledTime}</td></tr>
                        <tr><th scope="row">Status:</th><td>${status}</td></tr>
                        <tr><th scope="row">Last updated UTC:</th><td>${last_updated_utc}</td></tr>
                        <tr><th scope="row">Latitude and Longitude:</th><td>${lat || "N/A"}, ${lon || "N/A"}</td></tr>
                        <tr><th scope="row">Location:</th><td><span id="${locationPlaceholderId}">Loading...</span></td></tr>
                        <tr><th scope="row">Aircraft Model:</th><td>${aircraftModel}</td></tr>
                        <tr><th scope="row">Registration:</th><td>${aircraftRegistration}</td></tr>
                        <tr><th scope="row">Altitude:</th><td>${altitude} m</td></tr>
                        <tr><th scope="row">Ground speed:</th><td>${groundSpeed} km/h</td></tr>
                        ${isCargo ? `<tr><th scope="row">Flight Type:</th><td><strong>Cargo Flight</strong></td></tr>` : ""}
                        <tr><th scope="row">Aircraft image:</th><td style="padding:0">${aircraftImageUrl ? `<img src="${aircraftImageUrl}" alt="Airplane Image" style="width: 100%; height: auto;">` : "Not available"}</td></tr>
                    </tbody>
                </table>
            </div> 
        </div>
        `;

        // Fetch and display location only if latitude and longitude are available
        if (!isNaN(lat) && !isNaN(lon)) {
            getPlaceFromCoordinates(lat, lon, locationPlaceholderId);
        } else {
            document.getElementById(locationPlaceholderId).textContent = "Location not available";
        }
    });

    FLIGHT_INFO_CONTAINER.style.color = 'yellow';
}

function getPlaceFromCoordinates(lat, lon, locationPlaceholderId) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBHd6QXPEb55mCzIx9FjucTLiXM8_ZqXxE`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Geocoding request failed with status " + response.status);
        }
        return response.json();
    })
    .then(data => {
        const locationElement = document.getElementById(locationPlaceholderId);
        if (data && data.results && data.results.length > 0) {
            locationElement.textContent = data.results[0].formatted_address;
        } else {
            locationElement.textContent = "Location not available";
        }
    })
    .catch(error => {
        console.error("Error with geocoding request:", error);
        const locationElement = document.getElementById(locationPlaceholderId);
        locationElement.textContent = "Location not available";
    });
}

function toggleField(radio, fieldId) {
    document.getElementById("flightNumberInput").value = "";
    document.getElementById("flightRegInput").value = "";
    document.getElementById("flightCallSignInput").value = "";
    document.getElementById("flightIcao24Input").value = "";

    document.querySelectorAll('.field').forEach(field => {
        field.style.visibility = 'hidden';
        field.style.position = 'absolute';
    });

    const field = document.getElementById(fieldId);
    if (radio.checked && field) {
        field.style.visibility = 'visible';
        field.style.position = 'relative';
    }
}
