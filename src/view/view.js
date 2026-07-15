import { getProjects, getTasks } from "../model/appState.js";

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

export function renderTask() {
    const mainContent = document.querySelector(".main-content");
    const task = getTasks();
    mainContent.innerHTML = "";
    task.forEach(item => {
        const wraper = document.createElement("div");
        const title = document.createElement("h3")
        title.textContent = item.title;
        const id = document.createElement("p")
        id.textContent = item.id;
        const projectId = document.createElement("p")
        projectId.textContent = item.projectId;
        const desc = document.createElement("p");
        desc.textContent = item.desc;
        const dueDate = document.createElement("p");
        dueDate.textContent = item.dueDate;
        const priority = document.createElement("p")
        priority.textContent = item.priority;
        const isCompleted = document.createElement("p");
        isCompleted.textContent = item.isCompleted;
        const createdAt = document.createElement("p");
        createdAt.textContent = item.createdAt;


        wraper.appendChild(title);
        wraper.appendChild(id);
        wraper.appendChild(projectId);
        wraper.appendChild(desc);
        wraper.appendChild(dueDate);
        wraper.appendChild(priority);
        wraper.appendChild(isCompleted);
        wraper.appendChild(createdAt);

        mainContent.appendChild(wraper);

    })
}