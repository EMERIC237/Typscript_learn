"use strict";
// different generics
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("This is done!");
    }, 2000);
    if (false) {
        reject("This is rejected!");
    }
});
promise.then((data) => {
    data.split(" ");
});
// generic functions
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Max", hobbies: ["sports"] }, { age: 30 });
// console.log(merge({ nameMa: "x" }, { age: 30 }));
console.log(mergedObj.age);
function countAndDescribe(element) {
    let desc = "Got no value";
    if (element.length === 1) {
        desc = "Got 1 element";
    }
    else if (element.length > 1) {
        desc = "Got " + element.length + " elements";
    }
    return [element, desc];
}
console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["Sports", "Cooking"]));
function extractAndConvert(obj, key) {
    return "Value: " + obj[key];
}
// generics classes
//to make sure the class work only wit certain types
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        //in case of the index not found, this will return the last item of the array (since the index will be -1)
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
// readonly type
const fisrtNames = ["Max", "Anna"];
// fisrtNames.push("Emeric");
// fisrtNames.pop()
