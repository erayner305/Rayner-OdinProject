import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

export default class TodoManager {
	constructor() {
		let localLists = this.loadListsFromLocalStorage();
		// If locaLists is not found in localStorage, it will be null
		// So - not positive this will work
		this.lists = localLists || []; 
		this._currentListID = this.loadCurrentListIDFromLocalStorage();
	}

	set currentListID(id) {
		this._currentListID = id;
		this.saveCurrentListIDToLocalStorage();
	}

	get currentListID() {
		return this._currentListID;
	}

	findList(id) {
		let list = this.lists.find((list) => {
			return list.id == id;
		})

		if (list) {
			return list
		} else {
			console.error(`List "${id}" not found!`)
			return undefined;
		}
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

	saveCurrentListIDToLocalStorage() {
		localStorage.setItem("currentTodoList", JSON.stringify(this.currentListID));
	}

	loadListsFromLocalStorage() {
		const lists = localStorage.getItem("todoLists");
		return lists ? JSON.parse(lists) : [];
	}

	loadCurrentListIDFromLocalStorage() {
		const currentListID = localStorage.getItem("currentTodoList");
		return currentListID ? JSON.parse(currentListID) : 0;
	}
}
