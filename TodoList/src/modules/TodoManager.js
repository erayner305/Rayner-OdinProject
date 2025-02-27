import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

export default class TodoManager {
	constructor() {
		let localLists = this.loadListsFromLocalStorage();
		// If locaLists is not found in localStorage, it will be null
		// So - not positive this will work
		this.lists = localLists || [];
	}

	addList(title, id) {
		id = id || uuidv4();
		let newList = new TodoList(id, title);
		this.lists.push(newList);
		this.saveListsToLocalStorage();
		return this.lists[this.lists.length - 1];
	}

	deleteList(targetListID) {
		this.lists = this.lists.filter((todoList) => {
			return todoList.id != targetListID;
		});

		this.saveListsToLocalStorage();
	}

	moveItem(targetItem, currentList, targetList) {
		this.addItem(targetItem, targetList);
		this.deleteItem(targetItem, currentList);
	}

	saveListsToLocalStorage() {
		localStorage.setItem("todoLists", JSON.stringify(this.lists));
	}

	loadListsFromLocalStorage() {
		const lists = localStorage.getItem("todoLists");
		return lists ? JSON.parse(lists) : [];
	}
}
