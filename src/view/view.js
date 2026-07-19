import { getProjects, getTasks, getActiveProject} from "../model/appState.js";
import { format, differenceInDays, isPast } from "date-fns";

export function formatCreatedAt(createdAtString) {
    const createdAtObj = new Date(createdAtString);
    const formatted = format(createdAtObj, "dd MMMM yyyy")

    return formatted;
}


export function formatDueDate(dueDateString) {
    const dueDateObj = new Date(dueDateString);
    const formatted = format(dueDateObj, "dd MMMM yyyy")
    const dayLeft = differenceInDays(dueDateObj, new Date());

    if (isPast(dueDateObj)) {
        return `${formatted} (${Math.abs(dayLeft)} days overdue)`;
    } else if (dayLeft === 0) {
        return `${formatted} (today)`;
    } else {
        return `${formatted} (${dayLeft} days to go)`
    }
}

export function renderProject() {
    const projects = getProjects();
    sideBar.innerHTML= "";
    projects.forEach(item => {
        const projectWrapper = document.createElement("div");
        
        const title = document.createElement("h2");
        title.textContent = item.title;
        title.classList.add("project-title");
        title.dataset.id = item.id;
        const projectDeleteBtn = document.createElement("button");
        projectDeleteBtn.textContent = "Delete project";
        projectDeleteBtn.classList.add("project-delete");
        projectDeleteBtn.dataset.id = item.id;

        projectWrapper.appendChild(title);
        projectWrapper.appendChild(projectDeleteBtn);

        sideBar.appendChild(projectWrapper);
    })    

}


 
export function renderTask() {
    const activeProject = getActiveProject();
    const allTask = getTasks();

    const task = activeProject 
        ? allTask.filter(item => item.projectId === activeProject.id)
        : allTask;
    mainContent.innerHTML = "";
    

    task.forEach(item => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.dataset.id = item.id;
        const title = document.createElement("h3")
        title.textContent = item.title;
        const id = document.createElement("p")
        id.textContent = item.id;
        const projectId = document.createElement("p")
        projectId.textContent = item.projectId;
        const desc = document.createElement("p");
        desc.textContent = item.desc;
        const dueDate = document.createElement("p");
        dueDate.textContent = formatDueDate(item.dueDate);
        const priority = document.createElement("p")
        priority.textContent = item.priority;
        const isCompleted = document.createElement("input");
        isCompleted.type = "checkbox";
        isCompleted.dataset.id = item.id;
        isCompleted.checked = item.isCompleted;
        isCompleted.value = "is-completed";
        isCompleted.name = "is-completed";
        isCompleted.classList.add("toggle-complete");
        const isCompletedLabel = document.createElement("label");
        isCompletedLabel.textContent = item.isCompleted ? "Completed" : "In progress"; 
        isCompletedLabel.htmlFor = item.id;
        const createdAt = document.createElement("p");
        createdAt.textContent = formatCreatedAt(item.createdAt);
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.id = item.id;
        deleteBtn.classList.add("delete-btn");




        wrapper.appendChild(title);
        wrapper.appendChild(id);
        wrapper.appendChild(projectId);
        wrapper.appendChild(desc);
        wrapper.appendChild(dueDate);
        wrapper.appendChild(priority);
        wrapper.appendChild(isCompleted);
        wrapper.appendChild(isCompletedLabel);
        wrapper.appendChild(createdAt);
        wrapper.appendChild(deleteBtn);

        mainContent.appendChild(wrapper);

    })
}

export function fillEditForm(task) {
    title.value = task.title;
    desc.value = task.desc;
    dueDate.value = task.dueDate;
    priority.value = task.priority;
    isCompleted.checked = task.isCompleted;
    isCompletedLabel.textContent = task.isCompleted ? "Complete" : "In progress";
}

const isCompletedLabel = document.querySelector(".is-completed-label");
const projectForm = document.querySelector(".project-form");
const taskForm = document.querySelector(".task-form");
const mainContent = document.querySelector(".main-content");
const sideBar = document.querySelector(".sidebar");
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
const taskCloseBtn = document.querySelector(".task-close");




export { taskDialog, title, desc, dueDate, priority, isCompleted, taskSubmit, createTaskBtn, mainContent, projectDialog, projectTitle, color, projectSubmit, createProjectBtn, sideBar, projectForm, taskForm, taskCloseBtn };