let quoteElement = document.getElementById("quote");

document.write("-----------------------------------Funktiolla------------------------------------- <br> <br>");

let quoteHTML = quoteElement.innerHTML;

let repeatedText=''

function repeatingText(){
    repeatedText = (quoteHTML+'<br>').repeat(50);
    document.write (repeatedText);
}

repeatingText();