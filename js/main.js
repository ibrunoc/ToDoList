const inputTasks = document.querySelector('.input-tasks');
const buttonTasks = document.querySelector('.button-tasks');
const tasks = document.querySelector('.tasks');
const closeButton = document.querySelector('.close');

function createLI() {
  const li = document.createElement('li');
  return li;
}

function taskExists(text) {
  const liTasks = tasks.querySelectorAll('li');

  for (let task of liTasks) {
    if (task.innerText === text) {
      return true;
    }
  }

  return false;
}

function clearInput() {
  inputTasks.value = '';
  inputTasks.focus();
}

function showCloseButton() {
  closeButton.classList.remove('hidden');
}

function hideCloseButton() {
  closeButton.classList.add('hidden');
}

function createCloseButton(li) {
  const buttonClose = document.createElement('button');
  buttonClose.setAttribute('class', 'close');
  buttonClose.textContent = 'X';
  li.appendChild(buttonClose);
}

function createButtonOnLoad() {
  const liTasks = tasks.querySelectorAll('li');

  for (let task of liTasks) {
    createCloseButton(task);
  }

  if (liTasks.length > 0) {
    showCloseButton();
  }
}

function createTasks(textoInput) {
  if (taskExists(textoInput)) return;

  const li = createLI();
  li.innerText = textoInput;
  tasks.appendChild(li);
  clearInput();
  createCloseButton(li);

  saveTasks();

  showCloseButton();
}

buttonTasks.addEventListener('click', () => {
  if (!inputTasks.value) return;
  createTasks(inputTasks.value);
});

inputTasks.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (!inputTasks.value) return;
    createTasks(inputTasks.value);
  }
});

document.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('close')) {
    el.parentElement.remove();
    saveTasks();

    const liTasks = tasks.querySelectorAll('li');
    if (liTasks.length === 0) {
      hideCloseButton();
    }
  } else if (el.tagName === 'LI') {
    el.classList.toggle('checked');
    saveTasks();
  }
});

function saveTasks() {
  const liTasks = tasks.querySelectorAll('li');
  const todoList = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace('X', '').trim();

    const isCompleted = task.classList.contains('checked');

    todoList.push({
      text: taskText,
      completed: isCompleted
    });
  }

  const tasksJson = JSON.stringify(todoList);
  localStorage.setItem('todoList', tasksJson);
}

function loadTasks() {
  const tasksJson = localStorage.getItem('todoList');
  const todoList = JSON.parse(tasksJson);

  if (todoList) {
    for (let task of todoList) {
      const li = createLI();
      li.innerText = task.text;

      if (task.completed) {
        li.classList.add('checked');
      }

      tasks.appendChild(li);
      createCloseButton(li);
    }
  }
}

createButtonOnLoad();
loadTasks();