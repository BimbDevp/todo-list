import createTask from "../model/task.js";
import createProject from "../model/project.js";
import { saveData, loadData } from "../model/storage.js";
import { getProjects, getTasks, addProject, addTask, deleteTask } from "../model/appState.js";
import { renderProject, renderTask, title, desc, dueDate, priority, isCompleted, taskSubmit, createTaskBtn, mainContent, taskDialog, projectDialog, createProjectBtn, projectSubmit, projectTitle, color } from "../view/view.js"




export function initApp() {
    const loadProject = loadData("projects");
    const defaultProject = createProject("Default", "blue");
    const loadTask = loadData("tasks");
    if (loadProject) {
        loadProject.forEach(item => {
            addProject(item);
        })
    } else {
        addProject(defaultProject);
    }

    if (loadTask) {
        loadTask.forEach(item => addTask(item));
        renderTask();
    }

    renderProject();
}

export function handleAddTask(title, desc, dueDate, priority, isCompleted) {
    const newTask = createTask(title, desc, dueDate, priority, isCompleted);
    addTask(newTask);
    saveData("tasks", getTasks());

    renderTask();
}

export function handleAddProject(title, color){
    const newProject = createProject(title, color);
    addProject(newProject);
    saveData("projects", getProjects());

    renderProject();
}

export function bindEvents() {
    createTaskBtn.addEventListener("click", () => {
        taskDialog.showModal();
    });

    taskSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        handleAddTask(title.value, desc.value, dueDate.value, priority.value, isCompleted.checked)

        taskDialog.close();
    });

    mainContent.addEventListener("click", (e) => {
        if (!e.target.classList.contains("delete-btn")) return;
        const id = e.target.dataset.id;
        handleDeleteTask(id);
    });

    createProjectBtn.addEventListener("click", () => {
        projectDialog.showModal();
    })

    projectSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        handleAddProject(projectTitle.value, color.value);

        projectDialog.close();
    })
}


export function handleDeleteTask(id) {
    deleteTask(id);
    saveData("tasks", getTasks())
    renderTask();
}