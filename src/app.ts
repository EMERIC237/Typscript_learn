//Interface

interface Person {
  firstName: string;
  lastName: string;
  age: number;

  greet(lastName: string): void;
}

let user1: Person = {
  firstName: "Max",
  lastName: "Mustermann",
  age: 30,
  greet(greeting: string) {
    console.log(
      greeting + " my name is " + this.firstName + " " + this.lastName
    );
  },
};

user1.greet("Hi there");

////
////
////
type addFn = (num1: number, num2: number) => number;
let add: addFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};
//OR//
interface addFn2 {
  (num1: number, num2: number): number;
}
let add2: addFn2;
add2 = (n1: number, n2: number) => {
  return n1 + n2;
};

interface age {
  readonly age?: number;
}
interface Greetable extends age {
  firstName: string;
  lastName: string;
  greet(greeting: string): void;
}

class Person2 implements Greetable {
  readonly firstName: string; /*To make it clear that the name can be set only one time*/
  readonly lastName: string;
  age?: number;

  constructor(firstName: string, lastName: string, age?: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    if (age) {
      console.log(`age is ${age}`);
      this.age = age;
    }
   
  }

  greet(greeting: string) {
    if (this.age) {
      console.log(
        `${greeting} my name is ${this.firstName} ${this.lastName} and I am ${this.age}`
      );
    } else {
      console.log(`${greeting} my name is ${this.firstName} ${this.lastName}`);
    }
  }
}

let user2: Greetable;
user2 = new Person2("eme", "Fabi", 30);
user2.greet("Hi there");
