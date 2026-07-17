import createTask from "../model/task.js";
import createProject from "../model/project.js";
import { saveData, loadData } from "../model/storage.js";
import { getProjects, getTasks, addProject, addTask, deleteTask, deleteProject, getActiveProject, setActiveProject } from "../model/appState.js";
import { renderProject, renderTask, title, desc, dueDate, priority, isCompleted, taskSubmit, createTaskBtn, mainContent, taskDialog, projectDialog, createProjectBtn, projectSubmit, projectTitle, color, sideBar } from "../view/view.js"




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
        saveData("projects", getProjects())
    }

    setActiveProject(getProjects()[0]);

    if (loadTask) {
        loadTask.forEach(item => addTask(item));
        renderTask();
    }

    renderProject();
}

export function handleAddTask(title, desc, dueDate, priority, isCompleted) {
    const activeProject = getActiveProject();
    const newTask = createTask(title, desc, dueDate, priority, isCompleted);
    newTask.projectId = activeProject ? activeProject.id : null;
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

    sideBar.addEventListener("click", (e) =>{
        if (!e.target.classList.contains("project-delete")) return;
        const id = e.target.dataset.id;
     
        handleDeleteProject(id);
    })

    sideBar.addEventListener("click", (e) => {
        if (!e.target.classList.contains("project-title")) return;

        const id = e.target.dataset.id;

        const project = getProjects().find(item => item.id === id);
        setActiveProject(project);

        renderTask();
    })
}


export function handleDeleteTask(id) {
    deleteTask(id);
    saveData("tasks", getTasks())
    renderTask();
}

export function handleDeleteProject(id) {
    deleteProject(id);
    saveData("projects", getProjects())
    renderProject();
}