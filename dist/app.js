"use strict";
//A decorator is a function that takes a class as a parameter and returns the same class with some added functionality.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// function Logger(constructor: Function) {
//     console.log("Logging...");
//     console.log(constructor);
// }
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
//more useful decorators
// this decorator is used to render a new text on the DOM
// decorator only work when the class is created ot defined
// this decorator will replace the original constructor with a new contructor whenever we initiated a new instance of the class(because of the generic setted)
// decorator where you can return something are the ones addded to the class, methods,
function withTemplate(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookElt = document.getElementById(hookId);
                if (hookElt) {
                    hookElt.innerHTML = template;
                    hookElt.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
// @Logger("Logging from the Decorator...")
let Person = class Person {
    constructor() {
        this.name = "Max";
        console.log("creating a person object...");
    }
};
Person = __decorate([
    withTemplate("<h1>My person object</h1>", "app")
], Person);
// const pers = new Person();
// console.log(pers);
////
////
////
////
function Log(target, propertyName) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price - should be positive");
        }
    }
    getPriceWithTax(tax = 1.23) {
        return this._price * (tax + 1);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const Autobind = function (_, _2, descriptor) {
    const originalMethod = descriptor.value; // to get the original method
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
};
class Printer {
    constructor() {
        this.message = "THis is our printer";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
p.showMessage();
const button = document.querySelector("button");
button.addEventListener("click", p.showMessage);
