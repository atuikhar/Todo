const todoSubmit = document.getElementById('form');
const list = document.querySelector('.ulist');
const submitHandler = document.querySelector('.form');

// Add Todos

const createEl = (todoTask) => {
  const el = `
<li class='list-group-item d-flex justify-content-between align-items-center'>
  ${todoTask}
  <i class='fas fa-trash delete'></i>
</li>
`;

  list.innerHTML += el;
};

const formSubmit = (e) => {
  e.preventDefault();

  let todoTask = todoSubmit.value;
  createEl(todoTask);
  addTodos(todoTask);
  submitHandler.reset();
};

submitHandler.addEventListener('submit', formSubmit);

//Delete Todos

const delTodo = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('delete')) {
    const delFromStorage = e.target.parentElement.innerText;

    const currLocalStorage = JSON.parse(localStorage.getItem('todos'));

    const newLocalStorage = currLocalStorage.filter(
      (item) => item !== delFromStorage
    );

    localStorage.setItem('todos', JSON.stringify([...newLocalStorage]));
    e.target.parentElement.remove();
  }
};

list.addEventListener('click', delTodo);

// Add to localStorage

const addTodos = (todoTask) => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todoTask);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodos = () => {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    createEl(todo);
  });
};

getTodos();
