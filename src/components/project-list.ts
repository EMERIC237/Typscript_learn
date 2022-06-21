/// <reference path="base-components.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop.ts"/>

namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[] = [];
    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.assignedProjects = [];
      this.configure();
      this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @Autobind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @Autobind
    dragLeaveHandler(_event: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }
    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((proj) => {
          if (this.type === "active") {
            return proj.status === ProjectStatus.Active;
          }
          return proj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }
    private renderProjects() {
      const listElement = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listElement.innerHTML = "";
      for (const projectItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
      }
    }
  }
}
