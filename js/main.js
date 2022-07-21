const inputTasks = document.querySelector('.input-tasks');
const buttonTasks = document.querySelector('.button-tasks');
const tasks = document.querySelector('.tasks');

function createLI() {
  const li = document.createElement('li');
  return li;
}

inputTasks.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (!inputTasks.value) return;
    createTasks(inputTasks.value);
  }
})

function clearImput() {
  inputTasks.value = '';
  inputTasks.focus();
}

function createButton(li) {
  li.innerText += ' ';
  const buttonClose = document.createElement('button');
  buttonClose.innerText = 'X';
  buttonClose.setAttribute('class', 'close');
  li.appendChild(buttonClose);
}

function createTasks(textoInput) {
  const li = createLI();
  li.innerText = textoInput;
  tasks.appendChild(li);
  clearImput();
  createButton(li);
  saveTasks();
}

buttonTasks.addEventListener('click', () => {
  if (!inputTasks.value) return;
  createTasks(inputTasks.value);
});

document.addEventListener('click', (e) => {
  const el = e.target;
  
  if (el.classList.contains('close')) {
    el.parentElement.remove();
    saveTasks();
  }
});

tasks.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function saveTasks() {
  const liTasks = tasks.querySelectorAll('li');
  const todoList = [];
  
  for (let tasks of liTasks) {
    let tasksText = tasks.innerText;
    tasksText = tasksText.replace('Close', '').trim();
    todoList.push(tasksText);
  }
  
  const tasksJson = JSON.stringify(todoList);
  localStorage.setItem('tasks', tasksJson);
}

function addSavedTasks() {
  const tasks = localStorage.getItem('tasks');
  const todoList = JSON.parse(tasks)

  for (tasks of todoList) {
    createTasks(tasks);
  }
}

addSavedTasks();