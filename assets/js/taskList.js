const inputNewTask = document.querySelector(".input-newTask");
const btnAddTask = document.querySelector(".btn-AddTask");
const tasks = document.querySelector(".tasks");

btnAddTask.addEventListener("click", function() {
    if (!inputNewTask.value) return
    createTask(inputNewTask.value);
});

inputNewTask.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {                     
        if (!inputNewTask.value) return
        createTask(inputNewTask.value);
    }
});

document.addEventListener("click", function(event) {
    const element = event.target;

    if (element.classList.contains("removeTask")) {
        if (confirm("Sera o excluido o item " + (element.parentElement.innerText.replace("Apagar","")))){              
        element.parentElement.remove();
        saveTasks();}
    }

})

function createLi() {
    const li = document.createElement("li");
    return li;                      
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;                                       
    tasks.appendChild(li);
    cleanInput();
    createButtonRemove(li);
    saveTasks();
}

function cleanInput() {
    inputNewTask.value = "";
    inputNewTask.focus();
}

function createButtonRemove(li) {
    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "removeTask");
    btnRemove.innerText = "Apagar";

    li.appendChild(btnRemove);
}

function saveTasks() {
    const liTasks = tasks.querySelectorAll("li");
    const arrayListTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace("Apagar", "").trim();
        arrayListTasks.push(taskText);
    }

    const taskJSON = JSON.stringify(arrayListTasks);
    localStorage.setItem("tasksSaved", taskJSON);
}

function addTasksSaved() {
    const tasks = localStorage.getItem("tasksSaved");
    const tasksList = JSON.parse(tasks);

    for (let task of tasksList) {
        createTask(task);
    }
}

addTasksSaved();
