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
    const targetProject = projects.find(item => item.id === id);
    
    if (targetProject.isDefault === true) return;

    projects = projects.filter(item => item.id !== id);
    tasks = tasks.filter(item => item.projectId !== id);

    const currentProject = getActiveProject();
    if (currentProject.id !== id) {
        setActiveProject(currentProject)
    } else {
        setActiveProject(getProjects()[0]);
    }
    
}

let activeProject = null;

export function setActiveProject(project) {
    activeProject = project;
}

export function getActiveProject() {
    return activeProject;
}

export function toggleComplete(id) {
    const target = tasks.find(item => item.id === id);
    return target.isCompleted = !target.isCompleted;
}

export function editTask(id, updateFields) {
    const target = tasks.find(item => item.id === id);
    Object.assign(target, updateFields);
}