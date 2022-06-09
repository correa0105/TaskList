const inputNewTask = document.querySelector(".input-newTask");      //SELECIONA A CLASSE
const btnAddTask = document.querySelector(".btn-AddTask");          //SELECIONA A CLASSE
const tasks = document.querySelector(".tasks");                     //SELECIONA A CLASSE

btnAddTask.addEventListener("click", function() {                   //CAPTURA EVENTO DE CLICK DO BOTAO
    if (!inputNewTask.value) return                                 //SE A CLASSE FOR DIFERENTE DE VAZIO RETORNA A
    createTask(inputNewTask.value);                                 //FUNÇÃO DE CRIAR TAREFA COM O VALOR PREENCHIDO
});

inputNewTask.addEventListener("keypress", function(event) {         //MESMA FUNÇÃO ANTERIOR POREM COM A OPÇÃO DE DENTER
    if (event.keyCode === 13) {                     
        if (!inputNewTask.value) return
        createTask(inputNewTask.value);
    }
});

document.addEventListener("click", function(event) {                //CAPTURA EVENTO DE CLICK DE TODO O DOCUMENT
    const element = event.target;                                   //CRIA A VARIAVEL E ARMAZENA O LUGAR CLICADO

    if (element.classList.contains("removeTask")) {                 //SE O ELEMENTO CONTEM A CLASSE REMOVETASK 
        element.parentElement.remove();                             //REMOVE TODOS OS PARENTES;
        saveTasks();                                                //CHAMA A CLASSE SALVARTASKS
    }

})

function createLi() {                                               //CRIA UM ITEM NA LISTA (UM ELEMENTO LI)
    const li = document.createElement("li");
    return li;                      
}

function createTask(textInput) {                                    //CRIA UMA TAREFA
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
