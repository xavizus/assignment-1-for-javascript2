let todoList = {
    todos: [],

    displayTodos() {
        if(this.todos.length === 0) {
            console.log("Your array is empty!");
        } else {
            console.log("My Todos:");       
            for(let i = 0; i < this.todos.length; i++) {
                if(this.todos[i].completed === true) {
                console.log("(x)", this.todos[i].todoText); 
                } else {
                    console.log("( )", this.todos[i].todoText); 
                }
            }
        }
    },
    addTodo(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        this.displayTodos();
    },
    changeTodo(position, todoText) {
        this.todos[position].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },
    toggleCompleted(position) {
        let todo = this.todos[position];
        todo.completed = !todo.completed;
        this.displayTodos();
    },
    toggleAll() {
        totalTodos = this.todos.length;
        let completedTodos = 0;

        for(let i = 0; i < totalTodos; i++) {
            if(this.todos[i].completed === true) {
                completedTodos++;                
            }
        }

        if(completedTodos === totalTodos) {
            for(let i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        } else {
            for(let i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
        this.displayTodos();
    }   
};
    
/* let displayTodosButton = document.getElementById("displayTodosButton");
let toggleAllButton = document.getElementById("toggleAllButton");

displayTodosButton.addEventListener("click", function() {
    todoList.displayTodos();
});

toggleAllButton.addEventListener("click", function() {
    todoList.toggleAll();
}); */

let handlers = {
    displayTodos: function() {
        todoList.displayTodos();
    },
    addTodo: function() {
        let addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
    },
    changeTodo: function() {
        let changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        let changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value); 
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
    },
    deleteTodo: function() {
        let deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = "";
    },
    toggleCompleted: function() {
        let toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
    },
    toggleAll: function() {
        todoList.toggleAll();
    }
};

let view = {
    displayTodos: function() {
        let todosUl = document.querySelector("ul");
        todosUl.innerHTML = "";
        for(let i = 0; i < todoList.todos.length; i++) {
            let todoLi = document.createElement("li");
            let todo = todoList.todos[i];
            let todoTextWithCompletion = "";

            if(todo.completed === true) {
                todoTextWithCompletion = "(x) " + todo.todoText;
            } else {
                todoTextWithCompletion = "( ) " + todo.todoText;
            }

            todoLi.textContent = todoList.todos[i].todoText;
            todosUl.appendChild(todoLi);
        }
    }    
};

