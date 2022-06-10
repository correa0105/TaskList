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
    const li = createLi();                                          //ARMAZENA A FUNÇÃO DE CRIAR LI EM UAM CONSTANTE
    li.innerText = textInput;                                       
    tasks.appendChild(li);                                          //A CLASSE TASKS RECEBE O LI CRIADO JUNTAMENTE COM O TEXTO
    cleanInput();                                                   //LIMPA O INPUT
    createButtonRemove(li);                                         //CRIA O BOTAO REMOVER
    saveTasks();                                                    //CHAMA A CLASSE DE SALVAR AS TASKS
}

function cleanInput() {                                             //LIMPA O INPUT
    inputNewTask.value = "";                                        //DETERMIAN O INPUT VAZIO
    inputNewTask.focus();                                           //DA FOCUS NO INPUT
}

function createButtonRemove(li) {                                   //CRIA BOTAO REMOVER
    const btnRemove = document.createElement("button");             //ARMAZENA A CRIAÇÃO DE UM BOTÃO EM UMA CONSTANTE
    btnRemove.setAttribute("class", "removeTask");                  //O BOTAO RECEBE A CLASS REMOVETASK
    btnRemove.innerText = "Apagar";                                 //BOTAO REMOVE RECEBE O TEXTO APAGAR

    li.appendChild(btnRemove);                                      //O LI RECEBE O BOTAO REMOVE
}

function saveTasks() {                                              //FUNÇÃO PARA SALVAR AS TASKS
    const liTasks = tasks.querySelectorAll("li");                   //SELECIONA TODOS ELEMENTOS LI DENTRO DE TASKS
    const arrayListTasks = [];                                      //CRIA O ARRAY DAS TAREFAS

    for (let task of liTasks) {                                     //CRIA UMA VARIAVEL LET QUE VAI ARMAZENANDO O LI
        let taskText = task.innerText;                              //ARMAZENA O INNER TEXT DO LI EM UMA VARIAVEL CHAMADA TASKTEXT
        taskText = taskText.replace("Apagar", "").trim();           //TASK TEXT RECEBE A SUBSTITUIÇÃO DE APAGAR POR VAZIO
        arrayListTasks.push(taskText);                              //ADICIONA AO FINAL DO ARRAY LIST O TEXTO ARMAZENADO PELA VARIAVEL TEXT
    }

    const taskJSON = JSON.stringify(arrayListTasks);                //ARMAZENA EM UMA CONSTANTE A CONVERSÃO DO ARRAY LIST PARA JSON STRING
    localStorage.setItem("tasksSaved", taskJSON);                   //LOCAL STORAGE DO NAVEGADOR RECEBE A FUNÇÃO ARMAZENADA NA TASKJSON
}

function addTasksSaved() {                                          //ATUALIZA A PAGINA COM AS TASKS SALVAS
    const tasks = localStorage.getItem("tasksSaved");               //ARMAZENA OS DADOS DO LOCAL STORAGE EM UMA CONSTANTE
    const tasksList = JSON.parse(tasks);                            //TRANSFORMA OS DADOS DO STORAGE EM ARRAY EM ARMAZENA EM UMA VARIAVEL

    for (let task of tasksList) {                                   //CRIA UMA VARIAVEL TASK QUE VAI ARMAZENANDO O CADA ITEM DO ARRAY
        createTask(task);                                           //CHAMA A FUNÇÃO CREATETASK COM O VALOR DA VARIAVEL TASK
    }
}

addTasksSaved();                                                    //SEMPRE CHAMA A FUNÇÃO DE ATUALZIAR A APGINA COM AS TASKS SALVAS
