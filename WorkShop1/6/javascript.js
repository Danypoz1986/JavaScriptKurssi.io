var person = {
    firstname: "John",
    lastname: "Doe",
    address: "Mannerheimintie 1000",
    telephone: "+358-4444444",
    age: 50,
    eyeColor: "blue"
}

console.log(person.age)

const printInfo = function(obj){
    for(const key in obj){
        if (obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`);
    }
}
};

printInfo(person);

const people = [
    {
        name: "john",
        lastname: "nhoj",
        age: 25
    },
    {
        name: "jimmi",
        lastname: "immij",
        age: 35
    },
    {
        name: "andrew",
        lastname: "werdna",
        age: 45
    },
    {
        name: "jacky",
        lastname: "ykcaj",
        age: 55
    }
]
for (let i = 0; i < people.length; i++) {
    document.write(people[i].name + " " + people[i].lastname + "<br>");
}