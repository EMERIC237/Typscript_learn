//A decorator is a function that takes a class as a parameter and returns the same class with some added functionality.

// function Logger(constructor: Function) {
//     console.log("Logging...");
//     console.log(constructor);
// }
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

//more useful decorators
// this decorator is used to render a new text on the DOM
// decorator only work when the class is created ot defined

// this decorator will replace the original constructor with a new contructor whenever we initiated a new instance of the class(because of the generic setted)
// decorator where you can return something are the ones addded to the class, methods,
function withTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookElt = document.getElementById(hookId);

        if (hookElt) {
          hookElt.innerHTML = template;
          hookElt.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger("Logging from the Decorator...")
@withTemplate("<h1>My person object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("creating a person object...");
  }
}

// const pers = new Person();

// console.log(pers);

////
////
////
////
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number = 1.23) {
    return this._price * (tax + 1);
  }
}
type TypedMethodDecorator = <T extends Function>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

const Autobind : TypedMethodDecorator = function (_, _2, descriptor) {
  const originalMethod = descriptor.value; // to get the original method
  const adjDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod!.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "THis is our printer";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();

p.showMessage();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);
