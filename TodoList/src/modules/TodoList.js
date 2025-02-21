export default class TodoList {
	constructor(title) {
		this.title = title;
		this.todoList = [];
	}

	addTodoItem(todoItem) {
		this.todoList.push(todoItem);
	}

    removeTodoItem(todoItemID) {
        this.todoList = this.todoList.filter((todo) => {
            return todo.id != todoItemID
        })
    }
}
