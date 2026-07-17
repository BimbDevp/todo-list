let projects = [];
let tasks = [];


export function getProjects() {
    return projects;
}

export function getTasks() {
    return tasks;
}

export function addProject(project) {
    projects.push(project);
}

export function addTask(task) {
    tasks.push(task);
}

export function deleteTask(id) {
    tasks = tasks.filter(item => item.id !== id);
}

export function deleteProject(id) {
    projects = projects.filter(item => item.id !== id);
    tasks = tasks.filter(item => item.projectId !== id);
}

let activeProject = null;

export function setActiveProject(project) {
    activeProject = project;
}

export function getActiveProject() {
    return activeProject;
}