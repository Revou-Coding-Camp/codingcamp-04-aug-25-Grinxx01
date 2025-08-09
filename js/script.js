document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");
    const filterInput = document.getElementById("filter");
    const todoList = document.getElementById("todo-list");
    let todos = [];

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        const date = dateInput.value;
        if (!task || !date) return;
        const todo = { id: Date.now(), task, date };
        todos.push(todo);
        renderTodos(todos);
        todoForm.reset();
    });

    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            todos = todos.filter(todo => todo.id != id);
            renderTodos(todos);
        }
    });

    filterInput.addEventListener("change", () => {
        const filterDate = filterInput.value;
        if (!filterDate) renderTodos(todos);
        else renderTodos(todos.filter(todo => todo.date === filterDate));
    });

    function renderTodos(list) {
        todoList.innerHTML = "";
        if (!list.length) {
            todoList.innerHTML = "<li><span>No tasks found</span></li>";
            return;
        }
        list.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${todo.task}<br><small>${todo.date}</small></span>
                <button class="delete-btn" data-id="${todo.id}">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
});
