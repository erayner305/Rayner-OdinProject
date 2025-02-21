import TodoItem from "../modules/todoItem";
import TodoList from "../modules/TodoList";

let exampleTodoList = new TodoList("My Todo List");

let todoItem1 = new TodoItem(
	exampleTodoList.todoList.length,
	"Buy groceries",
	"Buy milk, eggs, and bread",
	"2023-10-01",
	"High"
);
exampleTodoList.addTodoItem(todoItem1);
let todoItem2 = new TodoItem(
	exampleTodoList.todoList.length,
	"Walk the dog",
	"Take the dog for a walk in the park",
	"2023-10-02",
	"Medium"
);
exampleTodoList.addTodoItem(todoItem2);
let todoItem3 = new TodoItem(
	exampleTodoList.todoList.length,
	"Finish project",
	"Complete the project for work",
	"2023-10-03",
	"High"
);
exampleTodoList.addTodoItem(todoItem3);
let todoItem4 = new TodoItem(
	exampleTodoList.todoList.length,
	"Read a book",
	"Read 'The Great Gatsby'",
	"2023-10-04",
	"Low"
);
exampleTodoList.addTodoItem(todoItem4);
let todoItem5 = new TodoItem(
	exampleTodoList.todoList.length,
	"Exercise",
	"Go to the gym for a workout",
	"2023-10-05",
	"Medium"
);
exampleTodoList.addTodoItem(todoItem5);
let todoItem6 = new TodoItem(
	exampleTodoList.todoList.length,
	"Call mom",
	"Call mom to catch up",
	"2023-10-06",
	"High"
);
exampleTodoList.addTodoItem(todoItem6);

export default exampleTodoList;
