function changeHeading() {
    document.querySelector('h1').innerHTML = "Modified Heading"; // Cambia il contenuto dell'h1
  };

function secondButton(){
  let h2 = document.querySelectorAll('h2')[1]
  h2.style.color = 'green'
  h2.style.fontFamily = 'Courier'
  h2.style.fontSize = '20px'
  h2.style.backgroundColor = 'red'
  };

  window.onload = function() {
    // Step 1: Get the third button element
    const tB = document.querySelectorAll("button")[2];
  
    // Step 2: Add an onclick event to the third button
    tB.onclick = function() {
      // Step 3: Find the fourth <p> tag in the document
      const p = document.getElementsByTagName("p");
      const fP = p[3];
  
      // Step 4: Create a new paragraph element with the "Lorem ipsum" text in italics
      const newP = document.createElement("p");
      newP.innerHTML = `<em>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit."</em>`;
  
      // Step 5: Append the new paragraph after the fourth <p> tag
      fP.insertAdjacentElement("afterend", newP);
  
      // Step 6: Change the background color of the entire page
      document.body.style.backgroundColor = "#f0f8ff"; // Light blue background
  
      // Step 7: Create a new image element for the logo and add it after the new paragraph
      const img = document.createElement("img");
      img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Jarre_helsinki_2009.jpg/170px-Jarre_helsinki_2009.jpg";
      img.alt = "Logo Image";
      newP.insertAdjacentElement("afterend", img);
    };
  };
  
  function hide(){
    document.getElementById("me").style.display = "none";
    
  }

  function show(){
    document.getElementById("me").style.display = "block";
    
  }

  function surprise() {
    const elements = document.getElementsByClassName("surprise");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.fontSize = "20px";
    }
}

function showSelectedCar() {
  var selection = document.getElementById("mySelect").value;
  var carImage = document.getElementById("carimage");
  alert("You selected " + selection);
  switch (selection) {
    case "BMW":
        carImage.src = "https://www.bmw.fi/content/dam/bmw/common/all-models/m-series/m8-coupe/2022/navigation/bmw-8series-coupe-modellfinder.png";
        break;
    case "Audi":
        carImage.src = "https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCEtzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grT6ny74PdpWc17rRt5j9o2ndecZdvJQMrUBejFpBgLgQSfG-ABKcSA5gEmVcAIhJAfCYnZgYG1gogI5IBBPj4SotyChKLEnP1yjNTSjIENQyIBMLsLq4hjp4-wQC67Znl6QAAAA?wid=850";
        break;
    case "Mercedes":
        carImage.src = "https://www.mercedes-benz.it/content/italy/it/passengercars/models/suv/w465-24-1/overview/_jcr_content/root/responsivegrid/tabs/tabitem/media_gallery/media_gallery_item_1074820463/image.component.damq1.3431009585828.jpg/mercedes-benz-g-class-w465-exterior-multibeamled-2176x1224-03-2024.jpg";
        break;
    case "Volvo":
        carImage.src = "https://www.rull.fi/pub_images/original/99303729_Elbil_Volvo_S90_1200x1200_Black.jpg";
        break;
    default:
        carImage.src = "https://via.placeholder.com/400"; // Placeholder image if no valid option is selected
}
}

function addBorder() {
  document.getElementById("carimage").style.border = "5px solid #01796F";
}

function removeBorder() {
  document.getElementById("carimage").style.border = "none";
}

function changePosition() {
  const image = document.getElementById("carimage");
  image.style.position = "relative"; // Ensure the position is relative
  image.style.left = "200px"; // Move 200px to the right
  image.style.top = "500px"; // Move 500px down
}



let direction = 1;
let position = 0;

function doMove() {
  const image = document.getElementById("carimage");
  image.style.position = "relative"; // Make sure the image is in relative position

  // Move the image by updating the top position
  position += 10 * direction;
  image.style.left = position + "px";

  // Reverse direction if the image reaches the top or bottom
  if (position > 1000 || position < 0) {
  direction *= -1; // Change direction (move down if at top, move up if at bottom)
    }
  }

  let opacity = 1.0;

function fadeOut() {
    const image = document.getElementById("carimage");

    // Decrease opacity until it reaches 0
    if (opacity > 0) {
        opacity -= 0.05; // Reduce opacity by 0.05 on each interval
        image.style.opacity = opacity;
    }
}

function remove() {
  const image = document.getElementById("carimage");
  image.remove(); // Remove the image element from the DO
}

function insertRows() {
  const table = document.getElementById("data").getElementsByTagName('tbody')[0]; // Get the table body

  // Get values from input fields
  const name = document.getElementById("textfield").value;
  const position = document.getElementById("textfield2").value;
  const salary = document.getElementById("textfield3").value;

  // Ensure the fields are not empty
  if (!name || !position || !salary) {
      alert("Please fill in all fields before inserting.");
      return;
  }

  // Create a new row
  const newRow = table.insertRow();

  // Insert new cells for the row
  const nameCell = newRow.insertCell(0);
  const positionCell = newRow.insertCell(1);
  const salaryCell = newRow.insertCell(2);

  // Add values from the input fields to the cells
  nameCell.innerHTML = name;
  positionCell.innerHTML = position;
  salaryCell.innerHTML = salary;

  // Clear the input fields after insertion
  document.getElementById("textfield").value = "";
  document.getElementById("textfield2").value = "";
  document.getElementById("textfield3").value = "";
}

function replaceAllLi() {
  // Get all the <li> elements on the page
  const listItems = document.querySelectorAll("li");

  // Loop through each <li> element
  listItems.forEach(function(item) {
      // Replace the content with a <strong> element
      item.innerHTML = '<strong style="color: red;">Replaced</strong>';
  });
}


function replaceAllLiWithSelect() {
  // Get all the <li> elements on the page
  const listItems = document.querySelectorAll("li");

  // Loop through each <li> element
  listItems.forEach(function(item) {

    // Check if the text contains the word 'Select'
      if (item.textContent.includes("Select")) {
        
        // Replace the content with a <strong> element containing 'Replaced'
        item.innerHTML = '<strong style="color: red;">Replaced</strong>';

      }

    })
}

//Poista kommentti käynnistääksesi funktiot.
//replaceAllLi(); 
//replaceAllLiWithSelect(); 
