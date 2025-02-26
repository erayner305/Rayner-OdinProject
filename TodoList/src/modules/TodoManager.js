import TodoList from "./TodoList";

export default class TodoManager {
	constructor(localLists) {
		// If locaLists is not found in localStorage, it will be null
		// So - not positive this will work
		this.lists = localLists || [];
	}

	addList(id, title) {
		let newList = new TodoList(id, title);
		if (newList) {
			this.lists.push(newList);
			return this.lists[this.lists.length - 1];
		} else {
			console.error("Invalid List Format!", newListData);
		}
	}

	deleteList(targetListID) {
		this.lists = this.lists.filter((todoList) => {
			return todoList.id != targetListID;
		});
	}

	moveItem(targetItem, currentList, targetList) {
		this.addItem(targetItem, targetList);
		this.deleteItem(targetItem, currentList);
	}
}
