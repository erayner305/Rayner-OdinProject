import TodoItem from "./TodoItem";

export default class TodoList {
	/**
	 *
	 * @param {number} id
	 * @param {String} title
	 */
	constructor(id, title) {
		this.id = id;
		this.title = title;
		this.items = [];
	}

	addItem(id, title, description, dueDate, priority) {
		let newItem = new TodoItem(id, title, description, dueDate, priority);
		this.items.push(newItem);
		return true;
	}

	deleteItem(targetItemID) {
		const initialLength = this.items.length;
		this.items = this.items.filter((todo) => {
			return todo.id != targetItemID;
		});
		return this.items.length < initialLength;
	}

	updateTitle(newTitle) {
		this.title = newTitle;
	}
}
