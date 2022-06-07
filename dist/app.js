"use strict";
//Interface
let user1 = {
    firstName: "Max",
    lastName: "Mustermann",
    age: 30,
    greet(greeting) {
        console.log(greeting + " my name is " + this.firstName + " " + this.lastName);
    },
};
user1.greet("Hi there");
let add;
add = (n1, n2) => {
    return n1 + n2;
};
let add2;
add2 = (n1, n2) => {
    return n1 + n2;
};
class Person2 {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        if (age) {
            console.log(`age is ${age}`);
            this.age = age;
        }
    }
    greet(greeting) {
        if (this.age) {
            console.log(`${greeting} my name is ${this.firstName} ${this.lastName} and I am ${this.age}`);
        }
        else {
            console.log(`${greeting} my name is ${this.firstName} ${this.lastName}`);
        }
    }
}
let user2;
user2 = new Person2("eme", "Fabi", 30);
user2.greet("Hi there");
