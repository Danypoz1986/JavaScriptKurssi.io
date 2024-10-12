const apiKey = 'd34033ba69e9564878317e0a33950821'; // Korvaa omalla OpenWeatherMap API-avaimellasi
const city = 'vantaa'; // Korvaa haluamallasi kaupunkinimellä
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fi`;

// Aseta nykyinen päivämäärä sivulle
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateStr = new Date().toLocaleDateString('fi-EU', options);
document.getElementById('currentDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

// Piilota päiväkirjakontti oletuksena
document.getElementById('output').style.display = 'none';

// Lisää uusi aktiviteetti-kenttä dynaamisesti
document.getElementById('addActivity').addEventListener('click', function () {
    addActivityField();
});

// Lisää alkuperäinen poistonappi logiikka aktiviteettikentille
function addDeleteButton(li) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Poista aktiviteetti';
    deleteButton.classList.add('delete-activity');
    deleteButton.style.marginBottom = '20px';
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

// Päivitä poistonappien näkyvyys
function updateDeleteButtons() {
    const activityFields = document.getElementsByName('activities');
    const deleteButtons = document.querySelectorAll('.delete-activity');

    if (activityFields.length > 1) {
        deleteButtons.forEach(button => button.style.display = 'block');
    } else {
        deleteButtons.forEach(button => button.style.display = 'none');
    }
}

// Lisää uusi aktiviteettikenttä
function addActivityField() {
    const li = document.createElement('li');
    const newActivityInput = document.createElement('input');
    newActivityInput.setAttribute('type', 'text');
    newActivityInput.setAttribute('name', 'activities');
    newActivityInput.setAttribute('placeholder', 'Lisää uusi aktiviteetti');
    li.appendChild(newActivityInput);
    addDeleteButton(li); // Lisää poistonappi uuteen kenttään
    document.getElementById('activitiesList').appendChild(li);
    updateDeleteButtons(); // Päivitä poistonappien näkyvyys
}

// Varmista, että poistonapit on asetettu oikein sivun latautuessa
document.addEventListener('DOMContentLoaded', function () {
    updateDeleteButtons(); // Varmista, että poistonappi on aluksi piilossa, jos vain yksi kenttä on olemassa
});

// Hae ja näytä säätiedot
async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        const weatherDescription = data.weather[0].description.toLowerCase();
        const temperature = data.main.temp.toFixed(1)
        document.getElementById('weatherCondition').textContent = `${temperature}°C, ${weatherDescription}`;

        const weatherVideo = document.getElementById('weatherVideo');
        const defaultImage = document.getElementById('defaultImage');

        if (/aurinko|selkeä/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/blue%20sky%20with%20sunshine%20and%20clouds%204k_preview%20(online-video-cutter.com).mp4'; // Aurinkoinen video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/sade|tihkusade/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/17013-278400948_small%20(online-video-cutter.com).mp4'; // Sateinen video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/pilvi/.test(weatherDescription)) {
            if (/osittain|haja|ajo|vähä/.test(weatherDescription)) {
                weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/17723-284467863_small.mp4'; // Osittain pilvinen video
            } else {
                weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/230528_small.mp4'; // Pilvinen video
            }
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/lumisade/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/7092-198553594_small.mp4'; // Lumisateinen video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else if (/sumu|usva/.test(weatherDescription)) {
            weatherVideo.src = 'https://storage.googleapis.com/projektin_saa/mixkit-a-light-mist-continuously-flows-at-a-fast-pace-50938-hd-ready.mp4'; // Sumuinen video
            weatherVideo.style.display = 'block';
            defaultImage.style.display = 'none';
        } else {
            weatherVideo.style.display = 'none';
            defaultImage.src = 'https://storage.googleapis.com/projektin_saa/a5b9502dec58849b9c964763790675b091743f86.jpg.webp'; // Oletuskuva
            defaultImage.style.display = 'block';
        }
    } catch (error) {
        console.error('Virhe haettaessa säätietoja:', error);
    }
}

getWeather(); // Hae sää tiedot sivun latautuessa

// Lataa päiväkirjamerkinnät localStoragesta sivun latautuessa
document.addEventListener('DOMContentLoaded', function () {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const outputList = document.getElementById('output');

    // Lataa vain viimeisin merkintä, jos se on olemassa
    if (savedEntries.length > 0) {
        const entry = savedEntries[0]; // Varmista, että vain yksi merkintä ladataan
        displayJournalEntry(entry.mood, entry.activities, entry.description);
    }

    // Tyhjennä lomake sivun latautuessa (jos ei piilossa)
    document.getElementById('activitiesForm').reset();
});

// Funktio näyttää päiväkirjamerkinnän tyylitellyillä otsikoilla ja normaalilla sisällöllä
function displayJournalEntry(mood, activities, description) {
    const outputList = document.getElementById('output');
    const journalEntry = `
        <p><span class="journal-title">Tämän päivän fiilis:</span> <br> ${mood}</p>
        <p><span class="journal-title">Toiminnot:</span> <br> ${activities.join(', ')}</p>
        <p><span class="journal-title">Toimintojen kuvaus:</span> <br> ${description}</p>
        <button class="delete-journal">Poista merkintä</button>
    `;

    outputList.innerHTML = journalEntry;
    outputList.style.display = 'block'; // Tee päiväkirja näkyväksi lähettämisen jälkeen

    // Lisää punaisen poistonapin tyyli
    applyButtonStyles();

    // Lisää poistonappitoiminnallisuus vastalisättyyn päiväkirjamerkintään
    document.querySelector('.delete-journal').addEventListener('click', deleteJournalEntry);
}

// Käsittele lomakkeen lähetys ja tallenna päiväkirjamerkintä localStorageen
document.getElementById('activitiesForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Estä lomakkeen lähetys

    // Tarkista, onko päiväkirjamerkintä jo olemassa
    const existingEntry = JSON.parse(localStorage.getItem('journalEntries'));
    if (existingEntry && existingEntry.length > 0) {
        alert("Päiväkirjamerkintä on jo julkaistu. Poista nykyinen merkintä, jotta voit julkaista uuden.");
        return;
    }

    // Hae lomakkeen arvot
    const mood = document.getElementById('mood').value.trim();
    const description = document.getElementById('description').value.trim();
    const activities = Array.from(document.getElementsByName('activities')).map(input => input.value.trim());

    // Tarkista, että kaikki kentät on täytetty
    if (!mood || !description || activities.some(activity => activity === "")) {
        alert("Täytä kaikki kentät ennen lähettämistä.");
        return;
    }

    // Luo uusi päiväkirjamerkintä-objekti
    const newEntry = { mood, activities, description };

    // Tallenna uusi päiväkirjamerkintä localStorageen
    localStorage.setItem('journalEntries', JSON.stringify([newEntry])); // Tallenna vain yksi merkintä

    // Näytä uusi merkintä tyylitellyillä otsikoilla
    displayJournalEntry(mood, activities, description);

    // Älä piilota lomaketta, vaan tyhjennä se lähetyksen jälkeen
    document.getElementById('activitiesForm').reset();
});

// Funktio poistaa päiväkirjamerkinnän
function deleteJournalEntry() {
    // Tyhjennä päiväkirja localStoragesta
    localStorage.removeItem('journalEntries');

    // Poista päiväkirjamerkintä DOMista
    const outputList = document.getElementById('output');
    outputList.innerHTML = '';
    outputList.style.display = 'none'; // Piilota päiväkirja, kun se on poistettu

    alert("Päiväkirjamerkintä poistettu. Voit nyt julkaista uuden.");

    // Varmista, että lomake pysyy näkyvissä ja tyhjennä se poistamisen jälkeen
    document.getElementById('activitiesForm').reset(); // Tyhjennä lomake
}

// Funktio lisää punaisen poistonapin tyylit
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
