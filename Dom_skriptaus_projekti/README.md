# Päiväkirja Web-sovellus

Tämä on yksinkertainen **päiväkirjasovellus**, jonka avulla käyttäjät voivat tallentaa mielialansa ja päivän aikana tehdyt toiminnot. Sovellus hakee myös säätilan valitusta kaupungista ja näyttää sen yhdessä vastaavan videon tai kuvan kanssa. Päiväkirjamerkinnät tallennetaan selaimen `localStorageen`, jolloin ne pysyvät tallessa seuraavaan käyttökertaan asti.


## Ominaisuudet

- **Säätiedot**: Sovellus hakee säätiedot OpenWeatherMap-rajapinnasta ja näyttää säätilan sekä lämpötilan. Jos sää on aurinkoinen, sateinen, pilvinen tai luminen, näytetään vastaava video.
- **Dynaamiset toimintokentät**: Käyttäjä voi lisätä tai poistaa toimintoja dynaamisesti lomakkeeseen.
- **Päiväkirjamerkintöjen hallinta**: Käyttäjä voi tallentaa, näyttää ja poistaa päiväkirjamerkintöjä selaimen `localStoragesta`.
- **Interaktiivinen lomake**: Lomakkeen avulla käyttäjä voi syöttää mielialansa, toiminnot ja niiden kuvauksen.


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