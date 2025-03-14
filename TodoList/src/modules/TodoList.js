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

	findItem(id) {
		let item = this.items.find((item) => {
			return item.id == id;
		})

		if (item) {
			return item
		} else {
			console.error(`List "${id}" not found!`)
			return undefined;
		}
	}

	addItem(title, description, dueDate, priority, id) {
		let newItem = new TodoItem(title, description, dueDate, priority, id);
		this.items.push(newItem);
		return this.items[this.items.length - 1];
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
