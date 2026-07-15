import { getProjects } from "../model/appState.js";

export function renderProject() {
    const sideBar = document.querySelector(".sidebar");
    const projects = getProjects();
    sideBar.innerHTML= "";
    projects.forEach(item => {
        const project = document.createElement("div");
        project.textContent = item.title;

        sideBar.appendChild(project)
    })    

}