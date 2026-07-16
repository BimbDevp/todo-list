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
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.id = item.id;
        deleteBtn.classList.add("delete-btn");




        wraper.appendChild(title);
        wraper.appendChild(id);
        wraper.appendChild(projectId);
        wraper.appendChild(desc);
        wraper.appendChild(dueDate);
        wraper.appendChild(priority);
        wraper.appendChild(isCompleted);
        wraper.appendChild(createdAt);
        wraper.appendChild(deleteBtn);

        mainContent.appendChild(wraper);

    })
}

const mainContent = document.querySelector(".main-content");
const taskDialog = document.querySelector(".task-dialog");
const title = document.querySelector("#title")
const desc = document.querySelector("#desc");
const dueDate = document.querySelector("#due-date");
const priority = document.querySelector("#priority")
const isCompleted = document.querySelector("#is-completed");
const taskSubmit = document.querySelector(".task-submit")
const createTaskBtn = document.querySelector(".create-task");
const projectDialog = document.querySelector(".project-dialog");
const projectTitle = document.querySelector("#project-title");
const color = document.querySelector("#color");
const projectSubmit = document.querySelector(".project-submit");
const createProjectBtn = document.querySelector(".create-project");



export { taskDialog, title, desc, dueDate, priority, isCompleted, taskSubmit, createTaskBtn, mainContent, projectDialog, projectTitle, color, projectSubmit, createProjectBtn };