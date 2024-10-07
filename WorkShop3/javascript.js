document.querySelectorAll("button")[0].addEventListener("click", function(){
alert("You clicked me! - " + Date());
});

document.querySelectorAll("button")[1].addEventListener("click", function() {
    const table = document.createElement("table");
    table.innerHTML = ` <br><br><br><br>
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Tiger Lion</td>
                <td>System Architect</td>
                <td>$3,208</td>
            </tr>
            <tr>
                <td>Garrett Summers</td>
                <td>Accountant</td>
                <td>$180,750</td>
            </tr>
            <tr>
                <td>Ashton Martin</td>
                <td>Junior Technical Author</td>
                <td>$860,000</td>
            </tr>
            <tr>
                <td>Cedric Kelly</td>
                <td>Senior Javascript Developer</td>
                <td>$43,306</td>
            </tr>
            <tr>
                <td>Airi Satou</td>
                <td>Accountant</td>
                <td>$162,700</td>
            </tr>
        </tbody>
    `;

    document.body.appendChild(table);
});


document.querySelectorAll("button")[2].addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);

            var coordinatesDiv = document.createElement("div");
            coordinatesDiv.innerHTML = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;

            var exercise1 = document.querySelector("h2:nth-of-type(1)").nextElementSibling;
            while (exercise1 && exercise1.tagName.toLowerCase() !== 'hr') {
                exercise1 = exercise1.nextElementSibling;
            }

            if (exercise1) {
                exercise1.parentNode.insertBefore(coordinatesDiv, exercise1);
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
document.querySelector("h2:nth-of-type(2)").addEventListener("mouseover", function(){
    console.log("Stepped over my by a mouse!")
});

document.querySelector("h2:nth-of-type(2)").addEventListener("mouseout", function(){
    console.log("Bye bye mouse!")
});

document.getElementById("textdata").addEventListener("focus", function(){
    this.placeholder = "Please fill in the form with proper data";
    this.style.backgroundColor = "aqua";
});

document.getElementById("textdata").addEventListener("keydown", function(){
    document.getElementById("charcount").innerText = "Characters " + this.value.length  //Charcount on kätevä, kun lomakkeella on maksimimerkkimäärä
});

document.querySelector("form button").addEventListener("click", function(){
    if(!(document.getElementById("textdata").value))
        alert("The text area is empty. Please fill in it.")
});

const coordsHeading = document.createElement('h2'); 
coordsHeading.id = 'coords';

const exercise4Heading = document.querySelector("h2:nth-of-type(4)");

exercise4Heading.insertAdjacentElement('afterend', coordsHeading);

const showCoordinates = function(event) {
    console.log("X = " + event.clientX + ", Y = " + event.clientY);
    coordsHeading.innerHTML = "Mouse coordinates when hoovering the div &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp X = " + event.clientX + "&nbsp &nbsp &nbsp &nbsp Y = " + event.clientY; 
};

const hideCoordinates = function() {
    coordsHeading.innerHTML = "";
};

exercise4Heading.addEventListener("mouseover", function(){
    document.addEventListener("mousemove", showCoordinates);
});

exercise4Heading.addEventListener("mouseout", function(){
    document.removeEventListener("mousemove", showCoordinates); 
    hideCoordinates();
});

