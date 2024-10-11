let quoteElement = document.getElementById("quote");

document.write("--------------------------------for silmukalla------------------------------------ <br> <br>");

let quoteHTML = quoteElement.innerHTML;

let repeatedText=''


for(var i=0; i<50; i++){
    repeatedText+=quoteHTML+'<br>';
}

document.write(repeatedText);