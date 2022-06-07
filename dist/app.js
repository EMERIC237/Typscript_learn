"use strict";
var _a;
const e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
// Function overloads help define what is going to be returned when the function is called
const result = add("Max", "Anna");
result.split("");
function printEmployeeInformation(emp) {
    console.log("Name: " + emp.name);
    if ("privileges" in emp) {
        console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("Start Date: " + emp.startDate);
    }
}
printEmployeeInformation(e1);
class Car {
    drive() {
        console.log("Driving...");
    }
}
class Truck {
    drive() {
        console.log("Driving a truck...");
    }
    loadCargo(amount) {
        console.log("Loading cargo..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed: " + speed);
}
moveAnimal({ type: "bird", flyingSpeed: 10 });
//type casting eg:
const paragraph = document.querySelector("p");
// const userInput = <HTMLInputElement>document.getElementById("user-input")!;
const userInput = (document.getElementById("user-input"));
userInput.value = "Hi there!";
const errorBag = {
    email: "Not a valid email",
    username: "Must start with a capital letter",
};
// Optional Chaining
// it helps us to avoid null and undefined errors by checking if the property exists before accessing it
const fetchedUserData = {
    id: "u1",
    name: "Max",
    job: { title: "CEO", description: "My own company" },
};
console.log("this is the job title: ", (_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
// Nullish Coalescing
// it helps us to avoid null and undefined errors by checking if the property exists before accessing it
const userInput2 = null;
const storedData = userInput2 !== null && userInput2 !== void 0 ? userInput2 : "DEFAULT"; // if userInput2 is null then storedData will be "DEFAULT"
