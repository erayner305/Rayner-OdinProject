import TodoManager from "../modules/TodoManager";

let testTodoManager = new TodoManager();

let todoList1 = {
	title: "My Todo List",
}

let exampleTodoList1 = testTodoManager.addList(
	todoList1.title
);

let todoList2 = {
	title: "Your Todo List",
}

let exampleTodoList2 = testTodoManager.addList(
	todoList2.title
);

let todoItem1 = {
	title: "Buy groceries",
	description: "Buy milk, eggs, and bread",
	dueDate: "2023-10-01",
	priority: "High"
};

exampleTodoList1.addItem(
	todoItem1.title,
	todoItem1.description,
	todoItem1.dueDate,
	todoItem1.priority,
);

exampleTodoList2.addItem(
	todoItem1.title,
	todoItem1.description,
	todoItem1.dueDate,
	todoItem1.priority,
);

export default [exampleTodoList1, exampleTodoList2];
