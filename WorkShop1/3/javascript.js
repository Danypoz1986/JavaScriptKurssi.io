var x = 51
var order = "Beer"
if (x>50){
    document.write("He is over 50")
    console.log("He is over 50")
} else if (x<=40 && x>30){
    document.write("<strong>Middle age man who ordered some " + order + "</strong>")
    console.log("<strong>Middle age man who ordered some " + order)
}  else if (x<=50 && x>40){
        document.write("<strong>Middle age man who is becoming old ordered some " + order + "</strong>")
        console.log("Middle age man who is becoming old ordered some + order ")
} else {
    document.write("He seems a bit underaged.")
    console.log("He seems a bit underaged.")
}
