const apiKey = 'd34033ba69e9564878317e0a33950821'; // Replace with your OpenWeatherMap API key
const city = 'vantaa'; // Replace with the city name you want to check
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fi`;

// Set current date on the page
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateStr = new Date().toLocaleDateString('fi-EU', options);
document.getElementById('currentDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

// Hide the journal container by default
document.getElementById('output').style.display = 'none';

// Add new activity input field dynamically
document.getElementById('addActivity').addEventListener('click', function () {
    addActivityField();
});

// Add initial delete button logic for activity fields
function addDeleteButton(li) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete activity';
    deleteButton.classList.add('delete-activity');
    deleteButton.style.marginBottom = '20px'
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.float = 'right';
    deleteButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (document.getElementsByName('activities').length > 1) {
            li.remove();
            updateDeleteButtons();
        }
    });
    li.appendChild(deleteButton);
}

// Function to update the visibility of delete buttons
function updateDeleteButtons() {
    const activityFields = document.getElementsByName('activities');
    const deleteButtons = document.querySelectorAll('.delete-activity');

    if (activityFields.length > 1) {
        deleteButtons.forEach(button => button.style.display = 'block');
    } else {
        deleteButtons.forEach(button => button.style.display = 'none');
    }
}

// Function to add a new activity field
function addActivityField() {
    const li = document.createElement('li');
    const newActivityInput = document.createElement('input');
    newActivityInput.setAttribute('type', 'text');
    newActivityInput.setAttribute('name', 'activities');
    newActivityInput.setAttribute('placeholder', 'Enter a new activity');
    li.appendChild(newActivityInput);
    addDeleteButton(li); // Add delete button to the new field
    document.getElementById('activitiesList').appendChild(li);
    updateDeleteButtons(); // Update the delete button visibility
}

// Ensure that delete buttons are correctly set when the page loads
document.addEventListener('DOMContentLoaded', function () {
    updateDeleteButtons(); // Ensure delete button is hidden initially if only one field is present
});

// Fetch and display weather data
async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const weatherDescription = data.weather[0].description.toLowerCase();
        document.getElementById('weatherCondition').textContent = weatherDescription;

        const weatherVideo = document.getElementById('weatherVideo');
        const defaultImage = document.getElementById('defaultImage');

        if (/aurinko|selkeä/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/47126-450995482_small.mp4'; // Sunny video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/sade|tihkusade/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/17013-278400948_small.mp4'; // Rainy video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/pilvi/.test(weatherDescription)) {
            if (/osittain/.test(weatherDescription)) {
                weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/17723-284467863_small.mp4'; // Partly cloudy video
            } else {
                weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/230528_small.mp4'; // Cloudy video
            }
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/lumisade/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/191855-891315497_small.mp4'; // Snowy video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/sumu|usva/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/103840-664507395_small.mp4'; // Foggy video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else {
            weatherVideo.style.display = 'none';
            defaultImage.src = 'https://storage.googleapis.com/projektin_saa/a5b9502dec58849b9c964763790675b091743f86.jpg.webp'; // Default image
            defaultImage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

getWeather(); // Fetch weather on page load

// Load journal entries from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const outputList = document.getElementById('output');

    // Load only the latest entry, if it exists
    if (savedEntries.length > 0) {
        const entry = savedEntries[0]; // Ensure only one entry is loaded
        displayJournalEntry(entry.mood, entry.activities, entry.description);
    }
});

// Function to display the journal entry with styled titles and normal content
function displayJournalEntry(mood, activities, description) {
    const outputList = document.getElementById('output');
    const journalEntry = `
        <p><span class="journal-title">Today's Mood:</span> <br> ${mood}</p>
        <p><span class="journal-title">Activities:</span> <br> ${activities.join(', ')}</p>
        <p><span class="journal-title">Activities Description:</span> <br> ${description}</p>
        <button class="delete-journal">Delete</button>
    `;

    outputList.innerHTML = journalEntry;
    outputList.style.display = 'block'; // Make the journal visible after submitting

    // Apply red button styling for the delete button
    applyButtonStyles();

    // Add delete functionality to the newly added journal entry
    document.querySelector('.delete-journal').addEventListener('click', deleteJournalEntry);
}

// Handle form submission and save journal to localStorage
document.getElementById('activitiesForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    const mood = document.getElementById('mood').value.trim();
    const description = document.getElementById('description').value.trim();
    const activities = Array.from(document.getElementsByName('activities')).map(input => input.value.trim());

    // Check if all fields are filled
    if (!mood || !description || activities.some(activity => activity === "")) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Create new journal entry object
    const newEntry = { mood, activities, description };

    // Save the new journal entry to localStorage
    localStorage.setItem('journalEntries', JSON.stringify([newEntry])); // Save only one entry

    // Display the new entry with styled titles
    displayJournalEntry(mood, activities, description);

    // Clear the form after submission
    document.getElementById('activitiesForm').reset();
});

// Function to delete the journal entry
function deleteJournalEntry() {
    // Clear the journal from localStorage
    localStorage.removeItem('journalEntries');

    // Remove the journal entry from the DOM
    const outputList = document.getElementById('output');
    outputList.innerHTML = '';
    outputList.style.display = 'none'; // Hide the journal when deleted

    alert("Journal entry deleted. You can now publish a new one.");
}

// Function to apply red button styles
function applyButtonStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
    .delete-journal {
        background-color: red;
        margin-top: 50px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -70px;
        padding: 10px 20px;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .delete-journal:hover {
        background-color: darkred;
    }
    `;
    document.head.appendChild(style);
}
