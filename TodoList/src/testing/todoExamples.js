import TodoManager from "../modules/TodoManager";

let testTodoManager = new TodoManager();

let todoList = {
	id: 0,
	title: "My Todo List",
}

let exampleTodoList = testTodoManager.addList(
	todoList.id,
	todoList.title
);

let todoItem1 = {
	id: exampleTodoList.items.length,
	title: "Buy groceries",
	description: "Buy milk, eggs, and bread",
	dueDate: "2023-10-01",
	priority: "High"
};

exampleTodoList.addItem(
	todoItem1.id,
	todoItem1.title,
	todoItem1.description,
	todoItem1.dueDate,
	todoItem1.priority,
);

export default [exampleTodoList, exampleTodoList];
