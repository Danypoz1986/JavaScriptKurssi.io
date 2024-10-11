var arr = [];
for (var i=0; i<15; i++){
    arr.push(Math.random());
}
for(var i=0; i<15; i++){
    document.write("<strong>" + arr[i] + "</strong><br>")
}
console.log(arr)
// Randomize numbers between 1-100//
for(var i=0; i<15; i++){
    arr[i] *= 100
}