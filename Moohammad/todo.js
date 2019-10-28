let todoList = {
    todos: [],

    displayTodos() {
        console.log("My Todos: ", this.todos);
    },
    addTodo(todo) {
        this.todos.push(todo);
        this.displayTodos();
    },
    changeTodo(position, newValue) {
        this.todos[position] = newValue;
        this.displayTodos();
    },
    deleteTodo(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    }
}
    



todoList.addTodo("item", "item2");
todoList.changeTodo(0, "changed item");
todoList.deleteTodo(0);
