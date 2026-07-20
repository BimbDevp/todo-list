import { format, differenceInDays, isPast } from "date-fns";

export function formatCreatedAt(createdAtString) {
    const createdAtObj = new Date(createdAtString);
    const formatted = format(createdAtObj, "dd MMMM yyyy")

    return formatted;
}


export function formatDueDate(dueDateString) {  
    if (!dueDateString) return "No due date"

    const dueDateObj = new Date(dueDateString);
    const formatted = format(dueDateObj, "dd MMMM yyyy");
    const dayLeft = differenceInDays(dueDateObj, new Date());

    if (isPast(dueDateObj)) {
        return `${formatted} (${Math.abs(dayLeft)} days overdue)`;
    } else if (dayLeft === 0) {
        return `${formatted} (today)`;
    } else {
        return `${formatted} (${dayLeft} days to go)`
    }
}

export function renderProject(projects, activeProject) {
    sideBar.innerHTML= "";
    projects.forEach(item => {
        const projectWrapper = document.createElement("div");

        if (item.id === activeProject?.id) {
            projectWrapper.classList.add("active-project");
        }
        
        
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


 
export function renderTask(tasks, activeProject) {
        
    const filteredTask = activeProject
        ? tasks.filter(item => item.projectId === activeProject.id)
        : tasks;

    
    mainContent.innerHTML = "";

    if (activeProject) {
        const heading = document.createElement("h2");
        heading.textContent = activeProject.title;
        mainContent.appendChild(heading);
    }

    if (filteredTask.length === 0) {
        const para = document.createElement("p");
        para.textContent = "There are no tasks for this project"
        mainContent.appendChild(para);
    }
    
    
    filteredTask.forEach(item => {
        
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.dataset.priority = item.priority;
        wrapper.dataset.id = item.id;
        const title = document.createElement("h3")
        title.textContent = item.title;
        const dueDate = document.createElement("p");
        dueDate.textContent = formatDueDate(item.dueDate);
        const isCompleted = document.createElement("input");
        isCompleted.type = "checkbox";
        isCompleted.dataset.id = item.id;
        isCompleted.checked = item.isCompleted;
        isCompleted.value = "is-completed";
        isCompleted.name = "is-completed";
        isCompleted.classList.add("toggle-complete");
        const taskCompletedLabel = document.createElement("label");
        taskCompletedLabel.textContent = item.isCompleted ? "Completed" : "In progress"; 
        taskCompletedLabel.htmlFor = item.id;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.id = item.id;
        deleteBtn.classList.add("delete-btn");






        wrapper.appendChild(title);
        wrapper.appendChild(dueDate);
        wrapper.appendChild(isCompleted);
        wrapper.appendChild(taskCompletedLabel);
        wrapper.appendChild(deleteBtn);

        mainContent.appendChild(wrapper);

    })
}

export function fillEditForm(task) {
    titleInput.value = task.title;
    descInput.value = task.desc;
    dueDateInput.value = task.dueDate;
    priorityInput.value = task.priority;
    isCompletedInput.checked = task.isCompleted;
    isCompletedLabel.textContent = task.isCompleted ? "Complete" : "In progress";
    notesInput.value = task.notes;
    checklistInput.value = task.checklist;
}

const isCompletedLabel = document.querySelector(".is-completed-label");
const projectForm = document.querySelector(".project-form");
const taskForm = document.querySelector(".task-form");
const mainContent = document.querySelector(".main-content");
const sideBar = document.querySelector(".sidebar");
const taskDialog = document.querySelector(".task-dialog");
const titleInput = document.querySelector("#title")
const descInput = document.querySelector("#desc");
const dueDateInput = document.querySelector("#due-date");
const priorityInput = document.querySelector("#priority")
const isCompletedInput = document.querySelector("#is-completed");
const taskSubmit = document.querySelector(".task-submit")
const createTaskBtn = document.querySelector(".create-task");
const projectDialog = document.querySelector(".project-dialog");
const projectTitle = document.querySelector("#project-title");
const projectSubmit = document.querySelector(".project-submit");
const createProjectBtn = document.querySelector(".create-project");
const taskCloseBtn = document.querySelector(".task-close");
const projectCloseBtn = document.querySelector(".project-close")
const notesInput = document.querySelector("#notes");
const checklistInput = document.querySelector("#checklist");




export { taskDialog, titleInput, descInput, dueDateInput, priorityInput, isCompletedInput, taskSubmit, createTaskBtn, mainContent, projectDialog, projectTitle, projectSubmit, createProjectBtn, sideBar, projectForm, taskForm, taskCloseBtn, projectCloseBtn, notesInput, checklistInput };