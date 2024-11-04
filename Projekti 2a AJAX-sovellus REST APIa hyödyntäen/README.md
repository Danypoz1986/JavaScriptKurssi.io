# Flight Info App

The Flight Info App allows users to search for flight information by entering various identifiers such as flight number, registration number, call sign, or ICAO24 code. The app fetches data from the AeroDataBox API, displaying flight details including departure and arrival times, aircraft model, altitude, ground speed, and more.

## Features

- **Search by Multiple Identifiers**: Users can search flights by flight number, registration number, call sign, or ICAO24.
- **Live Flight Data**: Displays live flight data retrieved from AeroDataBox API, including aircraft details and location information.
- **Animated UI Elements**: Includes a moving airplane image and sound effect for a more dynamic user experience.
- **Responsive Design**: Built using Bootstrap to ensure a responsive design across different screen sizes.

## Technologies Used

- **HTML**: Structure of the app
- **CSS (Bootstrap)**: Styling and layout, including custom styles
- **JavaScript**: Logic for fetching flight data, displaying information, and handling animations
- **API**: Uses AeroDataBox API to retrieve live flight information

## How to Use

1. **Open the App**: Load the `index.html` file in a web browser.
2. **Enter Flight Details**: Choose a search type (Number, Reg, Call Sign, ICAO24) and enter the corresponding identifier in the search field.
3. **Click Search**: Click the "Search" button to fetch and display flight information.
4. **View Results**: Flight details will be displayed, including departure and arrival times, aircraft model, altitude, ground speed, and other information.
5. **Animated Airplane Icon**: The airplane icon will animate on the screen upon loading, adding a visual effect.

## Files

- `index.html`: The main HTML file that structures the app's layout.
- `styles.css`: Custom CSS file for additional styling beyond Bootstrap.
- `script.js`: JavaScript file for the app's logic, including API calls and UI interactions.
- `README.md`: Documentation file (this file).

## Requirements

To run the Flight Info app, you need:

- A web browser (Google Chrome, Firefox, Safari, or Edge)
- Internet connection (for accessing the API)

## API Setup

This app uses the AeroDataBox API to fetch live flight data. Make sure to:

1. Obtain an API key from [AeroDataBox](https://rapidapi.com/aerodatabox/api/aerodatabox).
2. Replace the placeholder key in the `script.js` file:
   ```javascript
   headers: {
       "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
       "x-rapidapi-key": "YOUR_API_KEY_HERE"
   }
