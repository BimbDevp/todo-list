import createTask from "../model/task.js";
import createProject from "../model/project.js";
import { saveData, loadData } from "../model/storage.js";
import { getProjects, getTasks, addProject, addTask, deleteTask, deleteProject, getActiveProject, setActiveProject, toggleComplete, editTask } from "../model/appState.js";
import { renderProject, renderTask, title, desc, dueDate, priority, isCompleted, taskSubmit, createTaskBtn, mainContent, taskDialog, projectDialog, createProjectBtn, projectSubmit, projectTitle, sideBar, projectForm, taskForm, taskCloseBtn, isCompletedLabel, fillEditForm, projectCloseBtn} from "../view/view.js"




export function initApp() {
    const loadProject = loadData("projects");
    const defaultProject = createProject("Inbox");
    defaultProject.isDefault = true;
    const loadTask = loadData("tasks");
    if (loadProject && loadProject.length > 0) {
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

    }

    refreshAll();
}

export function handleAddTask(title, desc, dueDate, priority, isCompleted) {
    const activeProject = getActiveProject();
    const newTask = createTask(title, desc, dueDate, priority, isCompleted);
    newTask.projectId = activeProject ? activeProject.id : null;
    addTask(newTask);
    saveData("tasks", getTasks());

    refreshAll();
}

export function handleAddProject(title){
    const newProject = createProject(title);
    addProject(newProject);
    setActiveProject(newProject);
    saveData("projects", getProjects());

    refreshAll();
}

export function bindEvents() {
    createTaskBtn.addEventListener("click", () => {
        editingTaskId = null
        taskDialog.showModal();
    });

    taskSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        if (editingTaskId) {
            handleEditTask(editingTaskId, {title: title.value, desc: desc.value, dueDate: dueDate.value, priority: priority.value, isCompleted: isCompleted.checked});
        
        } else {
            handleAddTask(title.value, desc.value, dueDate.value, priority.value, isCompleted.checked);
        }


        taskDialog.close();
        taskForm.reset();
    });

    taskCloseBtn.addEventListener("click", () => {
        taskDialog.close();

        editingTaskId = null;
        taskForm.reset();
    });

    projectCloseBtn.addEventListener("click", () => {
        projectDialog.close();
        projectForm.reset();
    });

    mainContent.addEventListener("click", (e) => {
        if (!e.target.classList.contains("delete-btn")) return;
        const id = e.target.dataset.id;
        handleDeleteTask(id);
    });

    createProjectBtn.addEventListener("click", () => {
        projectDialog.showModal();
    });

    projectSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        handleAddProject(projectTitle.value);

        projectDialog.close();
        projectForm.reset();
    })

    sideBar.addEventListener("click", (e) =>{
        if (!e.target.classList.contains("project-delete")) return;
        const id = e.target.dataset.id;
     
        handleDeleteProject(id);
    });

    sideBar.addEventListener("click", (e) => {
        if (!e.target.classList.contains("project-title")) return;

        const id = e.target.dataset.id;

        const project = getProjects().find(item => item.id === id);
        setActiveProject(project);

        refreshAll();
    });

    mainContent.addEventListener("click", (e) => {
        if (!e.target.classList.contains("toggle-complete")) return;
        const id = e.target.dataset.id;
        handleToggleComplete(id);
    });

    mainContent.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) return;
        if (e.target.classList.contains("toggle-complete")) return;

        const wrapper = e.target.closest(".wrapper");
        if (!wrapper) return;

        const id = wrapper.dataset.id;
        openEditDialog(id);
    })
}


export function handleDeleteTask(id) {
    deleteTask(id);
    saveData("tasks", getTasks());
    refreshAll();
}

export function handleDeleteProject(id) {
    deleteProject(id);
    saveData("projects", getProjects());
    saveData("tasks", getTasks());

    refreshAll();
}

export function handleToggleComplete(id) {
    toggleComplete(id)
    saveData("tasks", getTasks());
    refreshAll();
}

export function handleEditTask(id, updateFields) {
    editTask(id, updateFields);
    saveData("tasks", getTasks());
    refreshAll();
}

let editingTaskId = null;

function openEditDialog(taskId) {
    const task = getTasks().find(item => item.id === taskId);
    fillEditForm(task);
    editingTaskId = taskId;
    taskDialog.showModal();
}

function refreshTaskView() {
    const activeProject = getActiveProject();
    renderTask(getTasks(), activeProject ? activeProject.id : null);

}

function refreshProjectView() {
    renderProject(getProjects(), getActiveProject());
}

function refreshAll() {
    refreshTaskView();
    refreshProjectView();
}