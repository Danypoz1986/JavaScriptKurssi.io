function areYouOldEnough(age){
    if (age<18){
        console.log(false)
        console.log("too young")
        return false;
    }
    else{
        console.log(true)
        window.alert("old enough")
        return true;
    }
}

console.log(areYouOldEnough(16))
document.write(areYouOldEnough(19))

window.alert(areYouOldEnough(5))
window.alert(areYouOldEnough(25))
