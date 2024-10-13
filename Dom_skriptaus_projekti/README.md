# Päivän Suunnitelma Web-sovellus

Tämä on yksinkertainen **päivän suunnitelmasovellus**, jonka avulla käyttäjät voivat tallentaa mielialansa ja päivän aikana suunnitellut toiminnot. Sovellus hakee myös säätilan valitusta kaupungista ja näyttää sen yhdessä vastaavan videon tai kuvan kanssa. Suunnitelmat tallennetaan selaimen `localStorageen`, jolloin ne pysyvät tallessa seuraavaan käyttökertaan asti.


## Ominaisuudet

- **Säätiedot**: Sovellus hakee säätiedot OpenWeatherMap-rajapinnasta ja näyttää säätilan sekä lämpötilan. Jos sää on aurinkoinen, sateinen, pilvinen tai luminen, näytetään vastaava video.
- **Dynaamiset toimintokentät**: Käyttäjä voi lisätä tai poistaa toiminnot dynaamisesti lomakkeeseen.
- **Päivän suunnitelman hallinta**: Käyttäjä voi tallentaa, näyttää ja poistaa päivän suunnitelmia selaimen `localStoragesta`.
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
    addDeleteButton(li);
    document.getElementById('activitiesList').appendChild(li);
}
```

- **Suunnitelman tallentaminen ja näyttäminen**

Funktio `displayJournalPlansEntry()` näyttää suunnitelman käyttäjän syöttämillä tiedoilla ja tallentaa sen localStorageen:


```javascript
function displayJournalPlansEntry(mood, activities, description) {
    const outputList = document.getElementById('output');
    const journalPlansEntry = `
        <p><span class="journalPlans-title">Tämän päivän fiilis:</span> <br> ${mood}</p>
        <p><span class="journalPlans-title">Toiminnot:</span> <br> ${activities.join(', ')}</p>
        <p><span class="journalPlans-title">Toimintojen kuvaus:</span> <br> ${description}</p>
        <button class="delete-journalPlans">Poista merkintä</button>
    `;

    outputList.innerHTML = journalPlansEntry;
    outputList.style.display = 'block';

    applyButtonStyles();

    document.querySelector('.delete-journalPlans').addEventListener('click', deleteJournalPlansEntry);
}
```

- **Suunnitelman poistaminen**

Funktio `deleteJournalPlansEntry()` poistaa tallennetun suunnitelman:

```javascript
function deleteJournalPlansEntry() {
    localStorage.removeItem('journalPlansEntries');
    const outputList = document.getElementById('output');
    outputList.innerHTML = '';
    outputList.style.display = 'none';
    alert("Päiväkirjamerkintä poistettu.");
}
```


## Johtopäätökset

Tämä "Päivän Suunnitelma" Web-sovellus tarjoaa käyttäjille helppokäyttöisen tavan tallentaa päivän suunnitelmat ja mielialat. Sääolosuhteisiin reagoiva video tekee sovelluksesta visuaalisesti houkuttelevamman ja interaktiivisemman. Suunnitelmat tallentuvat selaimen localStorageen, joten tiedot säilyvät sovelluksen sulkemisen jälkeen. Dynaamiset toimintokentät antavat käyttäjälle joustavuutta syöttää tarkempia tietoja päivän toiminnoista.
Linkit:

- Koodi GitHubissa: [Projektin GitHub-repositorio]()
- Esittelyvideo: [Katso esittelyvideo]()
- Raportti projektista: [Lataa projektiraportti]()

Yllä olevista linkeistä voit tarkastella projektin koodia, katsella esittelyvideota ja lukea tarkemman raportin projektista.