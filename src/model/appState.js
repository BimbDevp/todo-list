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