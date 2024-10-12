function changeHeading(){
    const heading = document.querySelector('h1');
    heading.textContent = 'Modified heading!';
}

function secondButton(){
    const heading = document.querySelectorAll('h2')[1];
    heading.style.background = '#40F99B';
    heading.style.color = '#F08700' 
}

function append(){
    text = document.querySelectorAll('p')[3];
    text.innerHTML += '<em>&nbspLorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.</em><br>'
    text
    const logoImage = document.createElement('img')
    logoImage.src = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-logo-design-template-af79801c9cfcb466763760fc1a03ed44_screen.jpg?ts=1681094973'
    logoImage.alt = 'Logo';
    text.appendChild(logoImage);

    document.body.style.background = 'lightgray'; 
}

const button3 = document.querySelectorAll('button')[2];
button3.addEventListener('click', append);

function hide(){
    element = document.getElementById('me')
    element.style.display = 'none'
}

function show(){
    element = document.getElementById('me')
    element.style.display = 'block'
}

function surprise(){
    element = document.getElementsByClassName('surprise')
    for(var i=0; i<element.length; i++){
    element[i].style.fontSize = '20px';
    }
}

function showUserChoice() {
    console.log('Dropdown change event fired');
    const carSelect = document.getElementById('mySelect');
    const carImage = document.getElementById('carimage');
    
    // Get the selected value from the dropdown
    const selectedCar = carSelect.value;
    alert("You selected: "+selectedCar)
    
    // Change the car image based on the user's selection
    if (selectedCar === 'BMW') {
        carImage.src = 'https://www.bmw.fi/content/dam/bmw/common/all-models/m-series/m8-coupe/2022/navigation/bmw-8series-coupe-modellfinder.png';
    } else if (selectedCar === 'Audi') {
        carImage.src = 'https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grzwSWC7XPNk9YO-lHtbAx79ye33EdrxhYgboYtYAEcyGQ4HsDJDiVGMAkyLwCEJEA4jM5MTMwsFYAGZEMICCoYUAkEGZ3cQ1x9PQJBgASieoX2QAAAA?wid=850';
    } else if (selectedCar === 'Mercedes') {
        carImage.src = 'https://www.mercedes-benz.it/content/dam/hq/passengercars/cars/g-class/w465-pi/modeloverview/03-2024/images/mercedes-benz-g-class-w465-modeloverview-696x392-03-2024.png';
    } else if (selectedCar === 'Volvo') {
        carImage.src = 'https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/electric-landing-volvo-fh-aero-electric-cgi-exterior-3?qlt=82&wid=1024&ts=1705487333957&dpr=off&fit=constrain&fmt=png-alpha';
    }
}

const selection = document.getElementById('mySelect') 
selection.addEventListener('change', showUserChoice)
const CAR_IMAGE = document.getElementById('carimage');

// 1. Move the image by 200px left and 500px down
function changePosition() {
    CAR_IMAGE.style.position = 'absolute'
    let currentTop = parseInt(window.getComputedStyle(CAR_IMAGE).top);
    let currentLeft = parseInt(window.getComputedStyle(CAR_IMAGE).left);
    CAR_IMAGE.style.top = (currentTop + 500) + 'px';
    CAR_IMAGE.style.left = (currentLeft + 200) + 'px';
}


let moveRight = true;  // To control the direction of movement
let pos = 0;  // Starting position

function doMove() {
    
    // Set the initial position style in JavaScript
    CAR_IMAGE.style.position = 'absolute';
    const rightEdge = window.innerWidth - CAR_IMAGE.offsetWidth 

    if (moveRight) {
        pos += 5;  // Move right
        if (pos >= rightEdge) {  // Reverse direction when it hits 400px
            moveRight = false;
        }
    } else {
        pos -= 5;  // Move left
        if (pos <= 0) {  // Reverse direction when it hits 0px
            moveRight = true;
        }
    }
    
    // Apply the updated position to the 'left' property
    CAR_IMAGE.style.left = pos + 'px';
}

// 3. Gradually fade out the image
let opacity = 1;
function fadeOut() {
    if (opacity > 0) {
        opacity -= 0.05;  // Decrease opacity
        CAR_IMAGE.style.opacity = opacity;
    }
}

function remove(){
    CAR_IMAGE.style.display= 'none'
}

function insertRows() {
    const name = document.getElementById('textfield').value
    const position = document.getElementById('textfield2').value
    const salary = document.getElementById('textfield3').value

    if(name === "" || position === "" || salary === "" || name === " " || position === " " || salary === " "){
        alert("täytä kaikki kentät!")
        return
    }
    const table = document.getElementById('data').getElementsByTagName('tbody')[0];

    const newRow = table.insertRow();
    const nameCell = newRow.insertCell(0);
    const positionCell = newRow.insertCell(1);
    const salaryCell = newRow.insertCell(2);

    nameCell.textContent = name;
    positionCell.textContent = position;
    salaryCell.textContent = salary;

    document.getElementById('textfield').value = '';
    document.getElementById('textfield2').value = '';
    document.getElementById('textfield3').value = '';
}

function replace() {
    elements = document.querySelectorAll('li')
    elements.forEach(function(element) {
        element.innerHTML = '<strong style="color: red;">Replaced</strong>'
});

}

// replace() => Poista kommentti käynnistääksesi funktion

function replaceSelect(){
    const elements = document.querySelectorAll('li');
    elements.forEach(function(element) {
        if (element.textContent.toLowerCase().includes("select")){
        element.innerHTML = '<strong style="color: red;">Replaced</strong>'
        }
});

}

// replaceSelect() => Poista kommentti käynnistääksesi funktion


