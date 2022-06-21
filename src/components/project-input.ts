/// <reference path="../decorators/autobind.ts"/>
/// <reference path="base-components.ts"/>
/// <reference path="../utils/validation.ts"/>

namespace App {
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
      super("project-input", "app", false, "user-input");

      this.titleInputEl = this.element.querySelector(
        "#title"
      )! as HTMLInputElement;
      this.descriptionInputEl = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;
      this.peopleInputEl = this.element.querySelector(
        "#people"
      )! as HTMLInputElement;
      this.configure();
    }
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputEl.value;
      const enteredDescription = this.descriptionInputEl.value;
      const enteredPeople = this.peopleInputEl.value;
      let validTitleOpt: validatable = {
        value: enteredTitle,
        required: true,
      };
      let validDescriptionOpt: validatable = {
        value: enteredDescription,
        required: true,
        minLength: 20,
        maxLength: 250,
      };
      let validPeopleOpt: validatable = {
        value: enteredPeople,
        min: 2,
        max: 50,
      };
      // validation
      if (
        !validate(validTitleOpt) ||
        !validate(validDescriptionOpt) ||
        !validate(validPeopleOpt)
      ) {
        alert("Invalid input, please try again");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
      }
      this.clearInputs();
    }

    renderContent() {}

    private clearInputs() {
      this.titleInputEl.value = "";
      this.descriptionInputEl.value = "";
      this.peopleInputEl.value = "";
    }
  }
}
