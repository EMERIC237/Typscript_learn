// // validator using decorators
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
function validatorDec(obj: any) {
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

// rendering the templates
const project_list: { title: string; description: string; people: number }[] =
  [];
interface ProjectStructure {
  title: string;
  description: string;
  people: number;
}
// Get the div with id app
const mainDiv = document.getElementById("app")!;
// Get the template with thw id project-input
const projectInputTemplate = document.getElementById(
  "project-input"
)! as HTMLTemplateElement;
// Render the template
mainDiv.appendChild(projectInputTemplate.content);

class Project implements ProjectStructure {
  @required
  title: string;
  @required
  description: string;
  @positiveNumber
  people: number;

  constructor(title: string, description: string, people: number) {
    this.title = title;
    this.description = description;
    this.people = people;
  }
}

const projectForm = document.querySelector("form")!;
projectForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const titleEL = document.getElementById("title") as HTMLInputElement;
  const descriptionEL = document.getElementById(
    "description"
  ) as HTMLInputElement;
  const peopleEL = document.getElementById("people") as HTMLInputElement;
  const title = titleEL.value;
  const description = descriptionEL.value;
  const people = +peopleEL.value;
  const project = new Project(title, description, people);
  if (!validatorDec(project)) {
    alert("Invalid input, please try again!");
    return;
  }
  project_list.push(project);
  // clear the form
  titleEL.value = "";
  descriptionEL.value = "";
  peopleEL.value = "";

  console.log(project_list);
});

// Rendering the projects on the template list.
const singleProjectTemplate = document.getElementById("single-project")!;
console.log("this is single project: ", singleProjectTemplate);
const projectList = document.getElementById("project-list")! as HTMLTemplateElement;
project_list.forEach((project) => {
  const projectClone = singleProjectTemplate.cloneNode(true);
  projectClone.lastChild!.textContent = project.title;
  projectList.appendChild(projectClone);
});

mainDiv.appendChild(projectList.content);