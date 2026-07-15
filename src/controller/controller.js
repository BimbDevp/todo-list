import createTask from "../model/task.js";
import createProject from "../model/project.js";
import { saveData, loadData } from "../model/storage.js";
import { getProjects, getTasks, addProject, addTask, deleteTask } from "../model/appState.js";
import { renderProject, renderTask, dialog, title, desc, dueDate, priority, isCompleted, submitBtn, createTaskBtn } from "../view/view.js"




export function initApp() {
    const loadProject = loadData("projects");
    const defaultProject = createProject("Default", "blue");
    const loadTask = loadData("tasks");
    console.log("loadTask:", loadTask)
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
    console.log(getTasks());
    saveData("tasks", getTasks());

    renderTask();
}

export function initView() {
    createTaskBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handleAddTask(title.value, desc.value, dueDate.value, priority.value, isCompleted.checked)

        dialog.close();
    });
}