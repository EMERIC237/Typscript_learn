/// <reference path="base-components.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop.ts"/>

namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    get persons() {
      if (this.project.people === 1) {
        return "1 person";
      }
      return this.project.people.toString() + " persons";
    }

    constructor(hostId: string, private project: Project) {
      super("single-project", hostId, false, project.id);
      this.configure();
      this.renderContent();
    }

    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }
    dragEndHandler(_event: DragEvent): void {
      console.log("dragEnd");
    }
    configure() {
      this.element.addEventListener(
        "dragstart",
        this.dragStartHandler.bind(this)
      );
      this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
    }
    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
