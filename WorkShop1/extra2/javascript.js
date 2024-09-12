var i=5; var j=10
var k=25; var l="Joe" //lainausmerkit puutuvat
if (i<j){
    console.log(i) //ei lainausmerkkeja
} else if (j>k){
    console.log(k) //ei lainausmerkkeja
}
else
console.log(j)//ei lainausmerkkeja

//else if ei ole järkevä koska samalla i<j ja j>k

var arr = [3, 5, 7];
for(var i=0; i<3; i++) //i<3, muuten overflow, i++
    console.log(arr[i])