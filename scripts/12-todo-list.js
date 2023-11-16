const todoList = JSON.parse(localStorage.getItem('todos')) || [
  { name: 'make dinner', dueDate: '2022-12-22' },
  { name: 'wash dishes', dueDate: '2022-12-22' }
];
renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(function (todoObject, index) {
    const { name, dueDate } = todoObject;
    const html = `
    <div class="row gy-3">
      <div class="col-4 text-center todo-box"><div class="todos">${name}</div></div>
      <div class="col-4 text-center todo-box"><div class="todos">${dueDate}</div></div>
      <div class="col-4 delete-button"><button class="delete-todo-button js-delete-todo-button"><span class="text">Delete</span></button></div>
      </div>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      updateLocalStorage();
      renderTodoList();
    });
  });
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  todoList.push({ name, dueDate });

  inputElement.value = ''; // this resets the text in a text box
  updateLocalStorage();
  renderTodoList();
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function handleTodoKeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', handleTodoKeydown);
});
