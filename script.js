document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');
    const itemsLeft = document.getElementById('items-left');
    const filterButtons = document.getElementById('filter-buttons');
    const clearCompletedBtn = document.getElementById('clear-completed');
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    function loadTodos() {
      todoList.innerHTML = '';
      todos.forEach(todo => createTodoElement(todo));
      updateItemsLeft();
    }
  
    function createTodoElement(todo) {
      const todoItem = document.createElement('li');
      todoItem.innerHTML = `
        <span>${todo.text}</span>
        <button class="delete-btn">Delete</button>
      `;
  
      todoItem.addEventListener('click', function () {
        todo.completed = !todo.completed;
        updateItemsLeft();
        saveTodos();
        loadTodos();
      });
  
      const deleteBtn = todoItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        todos = todos.filter(item => item !== todo);
        saveTodos();
        loadTodos();
      });
  
      todoList.appendChild(todoItem);
    }
  
    todoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const todoText = newTodoInput.value.trim();
      if (todoText !== '') {
        const newTodo = { text: todoText, completed: false };
        todos.push(newTodo);
        saveTodos();
        loadTodos();
        newTodoInput.value = '';
      }
    });
  
    function updateItemsLeft() {
      const activeTodos = todos.filter(todo => !todo.completed).length;
      itemsLeft.textContent = activeTodos === 1 ? '1 item left' : `${activeTodos} items left`;
    }
  
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    loadTodos();
  });
  