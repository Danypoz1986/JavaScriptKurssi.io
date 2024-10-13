# Päiväkirja Web-sovellus

Tämä on yksinkertainen **päiväkirjasovellus**, jonka avulla käyttäjät voivat tallentaa mielialansa ja päivän aikana tehdyt toiminnot. Sovellus hakee myös säätilan valitusta kaupungista ja näyttää sen yhdessä vastaavan videon tai kuvan kanssa. Päiväkirjamerkinnät tallennetaan selaimen `localStorageen`, jolloin ne pysyvät tallessa seuraavaan käyttökertaan asti.


## Ominaisuudet

- **Säätiedot**: Sovellus hakee säätiedot OpenWeatherMap-rajapinnasta ja näyttää säätilan sekä lämpötilan. Jos sää on aurinkoinen, sateinen, pilvinen tai luminen, näytetään vastaava video.
- **Dynaamiset toimintokentät**: Käyttäjä voi lisätä tai poistaa toimintoja dynaamisesti lomakkeeseen.
- **Päiväkirjamerkintöjen hallinta**: Käyttäjä voi tallentaa, näyttää ja poistaa päiväkirjamerkintöjä selaimen `localStoragesta`.
- **Interaktiivinen lomake**: Lomakkeen avulla käyttäjä voi syöttää mielialansa, toiminnot ja niiden kuvauksen.


## Ohjelman toiminta ja keskeiset funktiot

- **Säätietojen hakeminen**

Funktio `getWeather()` hakee säätiedot OpenWeatherMap-rajapinnasta, näyttää ne sovelluksessa ja vaihtaa videon sääolosuhteiden perusteella:

```javascript
async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const weatherDescription = data.weather[0].description.toLowerCase();
        const temperature = data.main.temp.toFixed(1);
        document.getElementById('weatherCondition').textContent = `${temperature}°C, ${weatherDescription}`;

        const weatherVideo = document.getElementById('weatherVideo');
        const defaultImage = document.getElementById('defaultImage');

        // Videon vaihtaminen säätilan mukaan
        if (/aurinko|selkeä/.test(weatherDescription)) {
            weatherVideo.src = 'aurinkoinen_video_url';
        } else if (/sade|tihkusade/.test(weatherDescription)) {
            weatherVideo.src = 'sateinen_video_url';
        } else if (/pilvi/.test(weatherDescription)) {
            weatherVideo.src = 'pilvinen_video_url';
        } else if (/lumisade/.test(weatherDescription)) {
            weatherVideo.src = 'luminen_video_url';
        } else {
            weatherVideo.style.display = 'none';
            defaultImage.style.display = 'block';
        }
    } catch (error) {
        console.error('Virhe haettaessa säätietoja:', error);
    }
}
```

- **Dynaaminen toimintojen lisääminen**

Funktio `addActivityField()` luo uuden syöttökentän toimintoja varten. Jokaisen kentän viereen lisätään poistonappi:
```javascript
function addActivityField() {
    const li = document.createElement('li');
    const newActivityInput = document.createElement('input');
    newActivityInput.setAttribute('type', 'text');
    newActivityInput.setAttribute('name', 'activities');
    newActivityInput.setAttribute('placeholder', 'Lisää uusi aktiviteetti');
    li.appendChild(newActivityInput);
    addDeleteButton(li); // Lisää poistonappi
    document.getElementById('activitiesList').appendChild(li);
}
```

- **Päiväkirjamerkinnän tallentaminen ja näyttäminen**

Funktio `displayJournalEntry()` näyttää päiväkirjamerkinnän käyttäjän syöttämillä tiedoilla. Tämä merkintä tallennetaan localStorageen:


```javascript
function displayJournalEntry(mood, activities, description) {
    const outputList = document.getElementById('output');
    const journalEntry = `
        <p><span class="journal-title">Tämän päivän fiilis:</span> ${mood}</p>
        <p><span class="journal-title">Toiminnot:</span> ${activities.join(', ')}</p>
        <p><span class="journal-title">Toimintojen kuvaus:</span> ${description}</p>
        <button class="delete-journal">Poista merkintä</button>
    `;
    outputList.innerHTML = journalEntry;
    outputList.style.display = 'block';
}
```

- **Päiväkirjamerkinnän poistaminen**

Funktio `deleteJournalEntry()` poistaa päiväkirjamerkinnän selaimen localStoragesta ja päivittää käyttöliittymän:

```javascript
function deleteJournalEntry() {
    localStorage.removeItem('journalEntries');
    const outputList = document.getElementById('output');
    outputList.innerHTML = '';
    outputList.style.display = 'none';
    alert("Päiväkirjamerkintä poistettu.");
}
```

## Johtopäätökset

Tämä Päiväkirja Web-sovellus tarjoaa käyttäjille yksinkertaisen ja helppokäyttöisen tavan tallentaa päivittäisiä tapahtumia ja mielialoja. Sääolosuhteisiin reagoiva video tekee sovelluksesta interaktiivisemman ja visuaalisesti houkuttelevamman. Käyttäjien päiväkirjamerkinnät tallentuvat selaimen localStorageen, mikä takaa sen, että tiedot säilyvät sovelluksen sulkemisen jälkeen. Dynaamisesti lisättävät ja poistettavat toimintokentät antavat käyttäjälle joustavuutta syöttää tarkempia tietoja päivän toiminnoista.
Linkit:

- Koodi GitHubissa: [Projektin GitHub-repositorio]()
- Esittelyvideo: [Katso esittelyvideo]()
- Raportti projektista: [Lataa projektiraportti]()

Yllä olevista linkeistä voit tarkastella projektin koodia, katsella esittelyvideota ja lukea tarkemman raportin projektista.