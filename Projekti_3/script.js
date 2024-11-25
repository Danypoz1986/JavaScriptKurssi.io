$(document).ready(function () {
  let currentHall = 0; // Track the current hall
  const halls = $(".hall"); // Get all halls
  const totalHalls = halls.length; // Total number of halls

  // Add a black overlay element to the body
  const overlay = $("<div id='black-overlay'></div>");
  $("body").append(overlay);

  // Style the black overlay with CSS
  $("#black-overlay").css({
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    zIndex: "1000",
    display: "none",
  });

  // Reset all videos
  function resetAllVideos() {
    $("video").each(function () {
      this.pause();
      this.currentTime = 0; // Reset video time
      $(this).hide(); // Hide all videos
    });
  }

  // Play countdown and then the movie
  function playCountdownAndMovie(hallElement) {
    const playButton = hallElement.find(".play-btn");
    const pauseButton = hallElement.find(".pause-btn");
    const forwardButton = hallElement.find(".forward-btn");
    const backwardButton = hallElement.find(".backward-btn");
  
    $(".details").hide();
    playButton.hide();
    pauseButton.hide();
    forwardButton.hide();
    backwardButton.hide();
  
    const countdownVideo = hallElement.find(".countdown-video").get(0);
    const mainVideo = hallElement.find(".main-video").get(0);
    const videoWrapper = hallElement.find(".video-wrapper").get(0);
    const header = document.querySelector("header");
  
    // Reset all videos
    resetAllVideos();
  
    if (countdownVideo && mainVideo) {
      let wasPlayingBeforeHeader; // Flag to track video state
    
      // Show and play the countdown video
      $(countdownVideo).fadeIn(1000, function () {
        countdownVideo.play();
    
        countdownVideo.onended = function () {
          // Hide countdown video and play main video
          $(countdownVideo).fadeOut(500, function () {
            $(mainVideo).fadeIn(500, function () {
              $(".details").show();
              mainVideo.play(); // Play main video after fade-in
    
              // Monitor header state
              const monitorHeader = () => {
                if (header.offsetHeight > 100) {
                    if (!mainVideo.paused) {
                        wasPlayingBeforeHeader = true; // Remember the video was playing
                        mainVideo.pause();
                    } 
                  }
                  if (wasPlayingBeforeHeader && header.offsetHeight < 600){
                    mainVideo.play();
                    wasPlayingBeforeHeader=false;
                  }
                  }
              // Set an interval to monitor header height dynamically
              const headerInterval = setInterval(monitorHeader, 100);
    
              // Show buttons on hover
              $(videoWrapper).hover(
                function () {
                  if (mainVideo.paused) {
                    playButton.show();
                    forwardButton.show();
                    backwardButton.show();
                  } else {
                    pauseButton.show();
                    forwardButton.show();
                    backwardButton.show();
                  }
                },
                function () {
                  // On hover out, hide buttons
                  playButton.hide();
                  forwardButton.hide();
                  backwardButton.hide();
                  pauseButton.hide();
                }
              );
    
              // Handle play button click
              playButton.off("click").on("click", function () {
                if (mainVideo.paused) {
                  mainVideo.play();
                }
              });
    
              // Handle pause button click
              pauseButton.off("click").on("click", function () {
                mainVideo.pause();
              });
    
              forwardButton.off("click").on("click", function () {
                mainVideo.currentTime += 10;
              });
    
              backwardButton.off("click").on("click", function () {
                mainVideo.currentTime -= 10;
              });
    
              // Clear the interval when video ends
              mainVideo.onended = function () {
                clearInterval(headerInterval);
                mainVideo.currentTime = 0;
              };
            });
          });
        };
      });
    }    
  }
  
  

  // Update the hall view
  function updateHall(hallIndex) {
    const currentHallElement = $(`#halls .hall:nth-child(${hallIndex + 1})`);

    // Show the black overlay
    $("#black-overlay").fadeIn(1000, function () {
      // Fade out all halls except the current one
      $(".hall").not(currentHallElement).hide();

      // Fade in the current hall
      currentHallElement.fadeIn(1000, function () {
        playCountdownAndMovie(currentHallElement); // Play videos for the current hall

        // Hide the black overlay after the transition
        $("#black-overlay").fadeOut(1000);
      });
    });
  }

  // Navigation controls
$("#next").click(function () {
  if (currentHall < totalHalls - 1) {
    // Reset current video before moving to the next hall
    const currentVideo = $(`#halls .hall:nth-child(${currentHall + 1}) .main-video`).get(0);
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0; // Reset video time
    }
    currentHall++;
    updateHall(currentHall);
  }
});

$("#prev").click(function () {
  if (currentHall > 0) {
    // Reset current video before moving to the previous hall
    const currentVideo = $(`#halls .hall:nth-child(${currentHall + 1}) .main-video`).get(0);
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0; // Reset video time
    }
    currentHall--;
    updateHall(currentHall);
  }
});


  // Link click event for MOVIES table
$("a[href^='#hall-']").click(function (e) {
  e.preventDefault(); // Prevent default anchor behavior
  const hallId = $(this).attr("href").replace("#hall-", ""); // Get the hall number
  const hallIndex = parseInt(hallId) - 1; // Convert to zero-based index
  currentHall = hallIndex; // Update the current hall
  updateHall(currentHall); // Update the hall view
});



  // Initialize the first hall
  $(".hall").hide(); // Hide all halls initially
  const firstHall = $(`#halls .hall:nth-child(${currentHall + 1})`);
  firstHall.show(); // Show the first hall
  playCountdownAndMovie(firstHall);
});

const monitorBackground = () => {
  const headerHeight = $("header").outerHeight(); // Get header height using jQuery
  console.log("Header height:", headerHeight); // Debugging

  if (headerHeight <= 100) {
    // Header is small, adjust background height
    $(".cinema-background").css({
      height: "calc(100vh - 50px)", // Adjust height
      backgroundPosition: "center top", // Ensure alignment
    });
  } else if (headerHeight > 500) {
    // Header is large, adjust background height
    $(".cinema-background").css({
      height: "100vh", // Full height
      backgroundPosition: "center top", // Center alignment
    });
  }
};

// Call the function initially
monitorBackground();

// Dynamically monitor header height every 100ms
setInterval(monitorBackground, 50);
