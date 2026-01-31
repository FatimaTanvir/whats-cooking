// This is my first time with TypeScript shtuff

// variables
let myName: string = "Fatima";
let age: number =  23;
let isSmart: boolean = true;

// arrays
let hobbies: string[] = ["crocheting", "hiking", "playing"];
let favNumbers: number[] = [3, 4, 5]

// printing
console.log(favNumbers)
console.log(hobbies)
console.log(isSmart)
console.log(age)
console.log(myName)

// interfaces <- templates to store object properties.
interface Enimy{
    name: string;
    age: number;
    isSmart: boolean;
}

// create a person object
let person: Enimy = {
    name: "TimTim",
    age: 23,
    isSmart: true
}
console.log(person)


// function
function greet(name: string): string {
    return "Hello " + name + "!";
}

let greeting = greet("Fatima")
console.log(greeting)

// array of objects
let people: Enimy[] = [
    {name: "Haris", age: 24, isSmart: true},
    {name: "Willy", age: 23, isSmart: false},
    {name: "Sam", age: 43, isSmart: true}
]

console.log(people)

// indexing an array
console.log(people[0])

// loop thorugh an array
for (let i=0; i < people.length; i ++) {
    console.log(people[i]?.name);

}

// if else 
    function checkSmart(person: Enimy): string {
        if (person.isSmart === true) {
            return person.name + " is smart hella";
        }
        else {
            return person.name + ' is kinda dumb';
        }
    }

for (let i=0; i < people.length; i++) {
     console.log(checkSmart(people[i]!));
}

//clasess
class User{
    name: string;
    age: number;
    isSmart: boolean;

    constructor(name: string, aage: number, isSmart: boolean) {
        this.name = name;
        this.age = age;
        this.isSmart = isSmart;
    }

    printInfo(): string{
        return `${this.name} is ${this.age} years old. Intellligence: ${isSmart}`
    }

}

const newUser = new User("Lina", 27, false);
console.log(newUser.printInfo());