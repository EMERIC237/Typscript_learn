// // classes to render the project and project list
//speial syntax to import namespaces
/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-input.ts"/>

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
