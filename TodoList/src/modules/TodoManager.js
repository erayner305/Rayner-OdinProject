import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";

export default class TodoManager {
	constructor() {
		this.lists = this.loadListsFromLocalStorage();
		this._currentListID = this.loadCurrentListIDFromLocalStorage();
		this._currentList = this.findList(this._currentListID);
	}

	set currentListID(id) {
		this._currentListID = id;
		this._currentList = this.findList(id);
		this.saveCurrentListIDToLocalStorage();
	}

	get currentListID() {
		return this._currentListID;
	}

	set currentList(list) {
		this._currentList = list;
		this._currentListID = list.id;
		this.saveCurrentListIDToLocalStorage();
	}

	get currentList() {
		return this._currentList;
	}

	findList(id) {
		let list = this.lists.find((list) => {
			return list.id == id;
		});

		if (list) {
			return list;
		} else {
			console.error(`List "${id}" not found!`);
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
		this.addItemToList(targetList, targetItem.title, targetItem.description, targetItem.dueDate, targetItem.priority, targetItem.id);
		this.deleteItemFromList(currentList, targetItem.id);
	}

	addItemToList(listID, title, description, dueDate, priority, id) {
		let targetList = this.findList(listID);
		let newItem = targetList.addItem(title, description, dueDate, priority, id || uuidv4());
		this.saveListsToLocalStorage();
		return newItem;
	}

	deleteItemFromList(listID, itemID) {
		let targetList = this.findList(listID);
		targetList = targetList.filter((todoItem) => {
			return todoItem.id != itemID
		})
		this.saveListsToLocalStorage();
	}

	setItemIsChecked(listID, itemID, isChecked) {
		let targetList = this.findList(listID);
		let targetItem = targetList.findItem(itemID);
		targetItem.isChecked = isChecked;
		this.saveListsToLocalStorage();
	}

	saveListsToLocalStorage() {
		localStorage.setItem("todoLists", JSON.stringify(this.lists));
	}

	saveCurrentListIDToLocalStorage() {
		localStorage.setItem("currentTodoList", JSON.stringify(this.currentListID));
	}

	loadListsFromLocalStorage() {
		const lists = localStorage.getItem("todoLists");
		if (lists) {
            const parsedLists = JSON.parse(lists);
            return parsedLists.map(listData => {
                const todoList = new TodoList(listData.id, listData.title);
                todoList.items = listData.items.map(itemData => {
                    return new TodoItem(itemData.title, itemData.description, itemData.dueDate, itemData.priority, itemData.isChecked, itemData.id);
                });
                return todoList;
            });
        }
        return [new TodoList(uuidv4(), "Default List")];
	}

	loadCurrentListIDFromLocalStorage() {
		const currentListID = localStorage.getItem("currentTodoList");
		return currentListID ? JSON.parse(currentListID) : this.lists[0].id;
	}
}
