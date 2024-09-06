const userAgent = navigator.userAgent;
let targetURL;
let message;

if (userAgent.includes('Firefox')){
    targetURL = 'https://www.mozilla.org';
    message = 'Redirecting to Mozilla webpage in ';
} else {
    targetURL = 'https://www.microsoft.com';
    message = 'Redirecting to Microsoft webpage in ';
}

let countdown = 10;
document.write("<p id='countdown'>" + message + countdown + " seconds...</p>")
 let countdownInterval = setInterval(function() {
 countdown--;
 document.getElementById('countdown').innerText = message + countdown + " seconds..."; 

 if (countdown <= 0){
    clearInterval(countdownInterval)
    window.location.href = targetURL;
 }
 }, 1000);
