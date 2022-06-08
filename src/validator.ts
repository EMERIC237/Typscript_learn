// validator using decorators
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //["required", "positive"]
  };
}

const registeredValidators: ValidatorConfig = {};

function required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "required",
    ],
  };
}
function positiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "positive",
    ],
  };
}
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @required
  name: string;
  @positiveNumber
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameEl = document.getElementById("name") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const name = nameEl.value;
  const price = +priceEl.value;
  const createdCourse = new Course(name, price);
  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log("this is the new created course:", createdCourse);
});
