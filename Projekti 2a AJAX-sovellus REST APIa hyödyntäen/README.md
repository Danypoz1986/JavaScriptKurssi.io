# Flight Info App

Flight Info App antaa käyttäjille mahdollisuuden hakea lentotietoja syöttämällä eri tunnisteita, kuten lennon numero, rekisterinumero, kutsutunnus tai ICAO24-koodi. Sovellus hakee tietoja AeroDataBox API:sta ja näyttää lentotiedot, kuten lähtö- ja saapumisajat, lentokonemallin, korkeuden, maanopeuden ja paljon muuta.

## Ominaisuudet

- **Haku useilla eri tunnisteilla**: Käyttäjät voivat hakea lentoja lennon numeron, rekisterinumeron, kutsutunnuksen tai ICAO24:n perusteella.
- **Reaaliaikaiset lentotiedot**: Näyttää reaaliaikaiset lentotiedot AeroDataBox API:sta, mukaan lukien lentokoneen yksityiskohdat ja sijaintitiedot.
- **Animoidut käyttöliittymäelementit**: Sisältää liikkuvan lentokonekuvan ja ääniefektin, joka tekee käyttäjäkokemuksesta dynaamisemman.
- **Responsiivinen suunnittelu**: Rakennettu käyttämällä Bootstrapia, jotta ulkoasu on responsiivinen eri näyttöko'oilla.

## Käytetyt teknologiat

- **HTML**: Sovelluksen rakenne
- **CSS (Bootstrap)**: Tyylit ja ulkoasu, mukaan lukien mukautetut tyylit
- **JavaScript**: Logiikka lentotietojen hakuun, tietojen näyttämiseen ja animaatioiden hallintaan
- **API**: Käyttää AeroDataBox API:ta lentotietojen hakemiseen

## Käyttöohjeet

1. **Avaa sovellus**: Lataa `index.html` tiedosto verkkoselaimeen.
2. **Syötä lentotiedot**: Valitse hakutyyppi (Numero, Rekisteri, Kutsutunnus, ICAO24) ja syötä vastaava tunniste hakukenttään.
3. **Klikkaa Hae**: Klikkaa "Search" painiketta hakeaksesi ja näyttääksesi lentotiedot.
4. **Näytä tulokset**: Lentotiedot näytetään, mukaan lukien lähtö- ja saapumisajat, lentokonemalli, korkeus, maanopeus ja muut tiedot.
5. **Animoitu lentokoneikoni**: Lentokoneikoni liikkuu näytöllä sovelluksen latautuessa, lisäten visuaalista tehostetta.

## Tiedostot

- `index.html`: Pääasiallinen HTML-tiedosto, joka määrittää sovelluksen rakenteen.
- `styles.css`: Mukautettu CSS-tiedosto lisätyyleille Bootstrapin ohella.
- `script.js`: JavaScript-tiedosto sovelluksen logiikkaa varten, mukaan lukien API-kutsut ja käyttöliittymän toiminnot.
- `README.md`: Dokumentaatiotiedosto (tämä tiedosto).

## Vaatimukset

Jotta voit käyttää Flight Info App -sovellusta, tarvitset:

- Verkkoselaimen (Google Chrome, Firefox, Safari tai Edge)
- Internet-yhteyden (API-yhteyksiä varten)

## API-asetukset

Tämä sovellus käyttää AeroDataBox API:ta reaaliaikaisten lentotietojen hakemiseen. Varmista seuraavat vaiheet:

1. Hanki API-avain [AeroDataBox](https://rapidapi.com/aerodatabox/api/aerodatabox) -sivustolta.
2. Korvaa `script.js` -tiedostossa oleva avain seuraavalla tavalla:
   ```javascript
   headers: {
       "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
       "x-rapidapi-key": "YOUR_API_KEY_HERE"
   }
