const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const paragraphDescriptionTask = document.querySelector('.app__section-active-task-description');
const bitRemoveCompleted = document.querySelector('#btn-remover-concluidas')
const bitRemoveAll = document.querySelector('#btn-remover-todas')

let taskSelected = null;
let liTaskSelected = null;

let tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];

function updateTask() {
    localStorage.setItem('tasksList', JSON.stringify(tasksList)); // localStorage so aceita string nesse caso temos que usar uma API que ja existe par transformar nosso objeto complexo em uma string
}

function createElementTask(task) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragraph = document.createElement('p')
    paragraph.textContent = task.description
    paragraph.classList.add('app__section-active-task-description')

    const button = document.createElement('button')
    button.classList.add('app_button-edit')

    button.onclick = () => {
        const newDescription = prompt('qual é o novo nome da tarefa ?');
        if (newDescription) {
            paragraph.textContent = newDescription;
            task.description = newDescription;
            updateTask()
        }
    }

    const imageButton = document.createElement('img')

    imageButton.setAttribute('src', '/imagens/edit.png')

    button.append(imageButton)
    li.append(svg)
    li.append(paragraph)
    li.append(button)

    if(task.completed) {
        li.classList.add('app__section-task-list-item-complete')
        button.setAttribute('disabled', 'disabled')
    }else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(element => {
                element.classList.remove('app__section-task-list-item-active')
            })
            if(taskSelected == task) {
                paragraphDescriptionTask.textContent = ''
                taskSelected = null
                liTaskSelected = null
                return
            }
            taskSelected = task
            liTaskSelected = li
            paragraphDescriptionTask.textContent = task.description
            li.classList.add('app__section-task-list-item-active')
            
        }
    }


    return li;
    
}

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');

})

formAddTask.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const task = {
        description: textArea.value
    }
    tasksList.push(task);
    const elementTask = createElementTask(task);
    ulTasks.append(elementTask);
    updateTask();
    textArea.value = '';
    formAddTask.classList.add('hidden');
})

tasksList.forEach(task => {
    const elementTask = createElementTask(task);
    ulTasks.append(elementTask);
});

document.addEventListener('FocoFinish', () => {
    if(taskSelected && liTaskSelected) {
        liTaskSelected.classList.remove('app__section-task-list-item-active')
        liTaskSelected.classList.add('app__section-task-list-item-complete')
        liTaskSelected.querySelector('button').setAttribute('disabled', 'disabled')
        taskSelected.completed = true
        updateTask()
    }
})

const removeTask = (onlyCompleted) => {
    const Select = onlyCompleted ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(Select)
    .forEach(element => {
        element.remove()
    })
    tasksList = onlyCompleted ? tasksList.filter(task => !task.completed) : []
    updateTask()
}

bitRemoveCompleted.onclick = () => removeTask(true) // passando a funcao por referencia ao inves de executar
bitRemoveAll.onclick = () => removeTask(false)