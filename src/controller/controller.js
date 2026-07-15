import createTask from "../model/task.js";
import createProject from "../model/project.js";
import { saveData, loadData } from "../model/storage.js";
import { getProjects, getTasks, addProject, addTask, deleteTask } from "../model/appState.js";
import { renderProject } from "../view/view.js";



export function initApp() {
    const load = loadData("projects");
    const defaultProject = createProject("Default", "blue");
    if (load) {
        load.forEach(item => {
            addProject(item);
        })
    } else {
        addProject(defaultProject);
    }

    renderProject();
}

export function handleAddTask(title, desc, dueDate, priority) {
    const newTask = createTask(title, desc, dueDate, priority);
    addTask(newTask);
    saveData("task", getTasks());
}

