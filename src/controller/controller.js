import createTask from "../model/task.js";
import createProject from "../model/project.js";
import { saveData, loadData } from "../model/storage.js";
import { getProjects, getTasks, addProject, addTask, deleteTask, deleteProject, getActiveProject, setActiveProject, toggleComplete, editTask } from "../model/appState.js";
import { renderProject, renderTask, title, desc, dueDate, priority, isCompleted, taskSubmit, createTaskBtn, mainContent, taskDialog, projectDialog, createProjectBtn, projectSubmit, projectTitle, color, sideBar, projectForm, taskForm, taskCloseBtn, isCompletedLabel, fillEditForm} from "../view/view.js"




export function initApp() {
    const loadProject = loadData("projects");
    const defaultProject = createProject("Inbox", "blue");
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
    setActiveProject(newProject);
    saveData("projects", getProjects());

    renderProject();
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
    })

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
        handleAddProject(projectTitle.value, color.value);

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

        renderTask();
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
    renderTask();
}

export function handleDeleteProject(id) {
    deleteProject(id);
    saveData("projects", getProjects());
    saveData("tasks", getTasks());
    renderProject();
}

export function handleToggleComplete(id) {
    toggleComplete(id)
    saveData("tasks", getTasks());
    renderTask();
}

export function handleEditTask(id, updateFields) {
    editTask(id, updateFields);
    saveData("tasks", getTasks());
    renderTask();
}

let editingTaskId = null;

function openEditDialog(taskId) {
    const task = getTasks().find(item => item.id === taskId);
    fillEditForm(task);
    editingTaskId = taskId;
    taskDialog.showModal();
}