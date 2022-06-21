"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    App.Autobind = function (_, _2, descriptor) {
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
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFunc) {
            this.listeners.push(listenerFunc);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, people) {
            const newProject = new App.Project(Math.random().toString(), title, description, people, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const projectToMove = this.projects.find((prj) => prj.id === projectId);
            if (projectToMove && projectToMove.status !== newStatus) {
                projectToMove.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    //class project
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
/// <reference path="base-components.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop.ts"/>
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData("text/plain");
            App.projectState.moveProject(projectId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(_event) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((proj) => {
                    if (this.type === "active") {
                        return proj.status === App.ProjectStatus.Active;
                    }
                    return proj.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderProjects() {
            const listElement = document.getElementById(`${this.type}-projects-list`);
            listElement.innerHTML = "";
            for (const projectItem of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector("ul").id, projectItem);
            }
        }
    }
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
var App;
(function (App) {
    //validatate function
    function validate(value) {
        let isValid = true;
        if (value.required) {
            isValid = isValid && value.value.toString().trim().length !== 0;
        }
        if (value.minLength != null && typeof value.value === "string") {
            isValid = isValid && value.value.length >= value.minLength;
        }
        if (value.maxLength != null && typeof value.value === "string") {
            isValid = isValid && value.value.length <= value.maxLength;
        }
        return isValid;
    }
    App.validate = validate;
})(App || (App = {}));
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="base-components.ts"/>
/// <reference path="../utils/validation.ts"/>
var App;
(function (App) {
    // ProjectInput Class
    class ProjectInput extends App.Component {
        constructor() {
            super("project-input", "app", false, "user-input");
            this.titleInputEl = this.element.querySelector("#title");
            this.descriptionInputEl = this.element.querySelector("#description");
            this.peopleInputEl = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        gatherUserInput() {
            const enteredTitle = this.titleInputEl.value;
            const enteredDescription = this.descriptionInputEl.value;
            const enteredPeople = this.peopleInputEl.value;
            let validTitleOpt = {
                value: enteredTitle,
                required: true,
            };
            let validDescriptionOpt = {
                value: enteredDescription,
                required: true,
                minLength: 20,
                maxLength: 250,
            };
            let validPeopleOpt = {
                value: enteredPeople,
                min: 2,
                max: 50,
            };
            // validation
            if (!App.validate(validTitleOpt) ||
                !App.validate(validDescriptionOpt) ||
                !App.validate(validPeopleOpt)) {
                alert("Invalid input, please try again");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                App.projectState.addProject(title, description, people);
            }
            this.clearInputs();
        }
        renderContent() { }
        clearInputs() {
            this.titleInputEl.value = "";
            this.descriptionInputEl.value = "";
            this.peopleInputEl.value = "";
        }
    }
    __decorate([
        App.Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
// // classes to render the project and project list
//speial syntax to import namespaces
/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-input.ts"/>
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList("active");
    new App.ProjectList("finished");
})(App || (App = {}));
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
})(App || (App = {}));
/// <reference path="base-components.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop.ts"/>
var App;
(function (App) {
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            return this.project.people.toString() + " persons";
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_event) {
            console.log("dragEnd");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler.bind(this));
            this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent =
                this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
