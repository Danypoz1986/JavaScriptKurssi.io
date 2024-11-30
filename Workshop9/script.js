$(document).ready(function() {
    // Select all H3 tags
    const h3Tags = $('h3');
    
    // Log the references to the console
    console.log(h3Tags);
});

$(document).ready(function() {
    // Find the div with id='contant' and replace its contents
    $('#contant').text('This is the new content!');
});

$(document).ready(function() {
    // Select the <img> element and change its src attribute
    $('img').attr('src', 'https://via.placeholder.com/150');
});

$(document).ready(function() {
    // Find all <li> elements containing "Lorem" and add underline
    $('li:contains("Lorem")').css('text-decoration', 'underline');
});

$(document).ready(function() {
    // Select all anchor tags within elements with class 'SideBarListBox' and apply CSS modifications
    $('.SideBarListBox a').css({
        'color': 'red',              // Change text color to red
        'text-decoration': 'none',  // Remove underline
        'font-size': '18px',         // Increase font size
        'padding': '5px',            // Add padding around the anchor
        'border': '1px solid black' // Add a border
    });
});

function fadeInMainHeading() {
    $('h1').fadeIn();
}

// Attach the function to the button
$('#button').click(fadeInMainHeading);

function fadeOutMainHeading() {
    $('h1').fadeOut();
}

// Attach the function to the button
$('#button2').click(fadeOutMainHeading);

function slideUpMainContents() {
    $('body').slideUp();
}

// Attach the function to the button
$('#button3').click(slideUpMainContents);


function slideDownMainContents() {
    $('body').slideDown();
}

// Attach the function to the button
$('#button4').click(slideDownMainContents);



function animateSequence() {
    $('div').animate({ 
        left: '+=100px',   // Move 100px to the right
        opacity: 0.5,      // Reduce opacity
        height: '+=50px'   // Increase height by 50px
    }, 1000)               // Duration of animation
    .animate({ 
        left: '-=100px',   // Move back 100px to the left
        opacity: 1,        // Restore full opacity
        height: '-=50px'   // Decrease height by 50px
    }, 1000);              // Duration of animation
}

// Attach the function to the button
$('#button5').click(animateSequence);

function loadContent() {
    $('#ajax').load('https://meijastiina.github.io/news_rss_topstories.xml');
}

$(document).ready(function() {
    // Exercise 4: Ajax Dropdown
    $('#mySelect').change(function() {
        const selectedValue = $('#mySelect').val();
        if (selectedValue === 'first') {
            $('#ajax').load('https://meijastiina.github.io/news_rss_topstories.xml');
        } else if (selectedValue === 'second') {
            $('#ajax').load('https://api.github.com');
        } else if (selectedValue === 'third') {
            $('#ajax').load('https://jsonplaceholder.typicode.com/posts');
        }
    });
});
