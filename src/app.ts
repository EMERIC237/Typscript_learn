// different generics
const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve, reject) => {
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

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Max", hobbies: ["sports"] }, { age: 30 });
// console.log(merge({ nameMa: "x" }, { age: 30 }));
console.log(mergedObj.age);

interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let desc = "Got no value";
  if (element.length === 1) {
    desc = "Got 1 element";
  } else if (element.length > 1) {
    desc = "Got " + element.length + " elements";
  }
  return [element, desc];
}

console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["Sports", "Cooking"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

// generics classes
//to make sure the class work only wit certain types
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
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

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: "Max" });
// objectStorage.addItem({ name: "Manu" });
// objectStorage.removeItem({ name: "Max" });
// console.log("this our object item", objectStorage.getItems());

// orther types

//partial
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// readonly type

const fisrtNames: Readonly<string[]> = ["Max", "Anna"];
// fisrtNames.push("Emeric");
// fisrtNames.pop()
