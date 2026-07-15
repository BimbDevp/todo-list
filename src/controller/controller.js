import createTask from "../model/task";
import createProject from "../model/project";
import { saveData, loadData } from "../model/storage";
import { getProjects, getTasks, addProject, addTask, deleteTask } from "../model/appState";



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
}

export function handleAddTask(title, desc, dueDate, priority) {
    const newTask = createTask(title, desc, dueDate, priority);
    addTask(newTask);
    saveData("task", getTasks());
}