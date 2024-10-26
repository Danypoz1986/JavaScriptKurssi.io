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

// Trigger the movement and fade-in effect when the page loads
window.onload = moveImage;

function searchFlight(){
    const flightNumber = document.getElementById("flightNumberInput").value;
    const apiUrl = `https://aerodatabox.p.rapidapi.com/flights/search/term?q=${flightNumber}`; // URL with flight number
 

    fetch(apiUrl, {
       method: "GET",
       headers: {
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        "X-RapidAPI-Key": "7b9ac5ecd9msh9b73602d1653c0ap1e16cajsn942e05cca554"
       } 
    })
    .then(response => {
        if (!response.ok){
            throw new Error("Network response was not ok " +response.statusText);
        }

        return response.json()
    })
    .then(data => {
        console.log(data);

        displayFlightData(data);
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation", error);
        alert("Flight information could not be retrieved. Please try again");
    });
     
}

// Function to display flight data on the page
function displayFlightData(data) {
    const resultsContainer = document.getElementById("searchContainer");

    resultsContainer.innerHTML = "";

    const flightInfo = document.createElement("div");
    flightInfo.classList.add("flight-info");

    flightInfo.innerHTML = `
        <h2>Flight Information</h2>
        <p><strong>Flight Number:</strong> ${data[0]?.flight?.number || "N/A"}</p>
        <p><strong>Departure:</strong> ${data[0]?.departure?.airport?.name || "N/A"} at ${data[0]?.departure?.scheduledTimeLocal || "N/A"}</p>
        <p><strong>Arrival:</strong> ${data[0]?.arrival?.airport?.name || "N/A"} at ${data[0]?.arrival?.scheduledTimeLocal || "N/A"}</p>
    `;

    document.getElementsByClassName("flight-info").style.color = "yellow"

    resultsContainer.appendChild(flightInfo);
}