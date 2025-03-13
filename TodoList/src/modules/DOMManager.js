import TodoManager from "./TodoManager";

const ModalType = {
	LIST: "list",
	ITEM: "item",
};

const Mode = {
	CREATE: "create",
	UPDATE: "update",
};

export default class DOMManager {
	constructor(todoManager) {
		this.todoManager = todoManager;
        this.renderTodoList(todoManager.findList(todoManager.currentListID));
		this.bindEvents();
		this.updateListSelector();
	}

	/**
	 *
	 * @param {string} modalType "list" or "item"
	 * @param {*} data?
	 */
	openModal(modalType, data) {
		let modal = document.querySelector(`#${modalType}_modal`);
		let mode = data ? Mode.UPDATE : Mode.CREATE;

		let cancelBtn = modal.querySelector("#modal-cancel");
		cancelBtn.addEventListener("click", (event) => {
			this.closeModal(event.target.closest(".modal"));
		});

		let saveBtn = modal.querySelector(`#${modalType}-save`);
		saveBtn.addEventListener("click", (event) => {
			// probably need a function to gather all the data here
			// will call TodoManager.addList or TodoManager.lists[x].addItem
			this.saveModal(event.target.closest(".modal"), modalType, mode);
		});

		modal.showModal();
	}

	/**
	 *
	 * @param {Node} modal
	 * @param {String} modalType
	 * @param {String} mode
	 */
	saveModal(modal, modalType, mode) {
		console.log(modalType);
		console.log(mode);
		if (modal) {
			if (modalType == ModalType.LIST) {
				let title = modal.querySelector("#list-title").value;
				if (mode == Mode.CREATE) {
					let newTodo = this.todoManager.addList(title);
					console.log(this.todoManager.lists);
					this.updateListSelector();
					this.renderTodoList(newTodo);
				} else {
				}
			} else {
				if (mode == Mode.CREATE) {
				} else {
				}
			}
		}

		this.closeModal(modal);
	}

	closeModal(modal) {
		if (modal) {
			this.clearModalInputs(modal);
			modal.close();
		}
	}

	clearModalInputs(modal) {
		const inputs = modal.querySelectorAll("input, textarea, select");
		inputs.forEach((input) => {
			if (input.type === "checkbox" || input.type === "radio") {
				input.checked = false;
			} else {
				input.value = "";
			}
		});
	}

	updateListSelector() {
		const listSelector = document.querySelector("#list_selector");
		listSelector.innerHTML = '<option value="">Select Todo List</option>'; // Clear existing options

        let currentListID = document.querySelector("#todo_list__title_list").getAttribute("data-list-id");

		this.todoManager.lists.forEach((list) => {
            if (list.id !== currentListID) {
                const option = document.createElement("option");
                option.value = list.id;
                option.textContent = list.title;
                listSelector.appendChild(option);
            }
		});

		// Add an option to create a new list
		const newListOption = document.createElement("option");
		newListOption.value = -1;
		newListOption.textContent = "Create New List";
		listSelector.appendChild(newListOption);
	}

	renderTodoList(todoList) {
		let listElem = document.querySelector("#todo_list");

		let listTitleElem = listElem.querySelector("#todo_list__title_list");
		listTitleElem.textContent = todoList.title;
        listTitleElem.setAttribute("data-list-id", todoList.id)

		let listItems = listElem.querySelector("#todo_list__items");
		listItems.innerHTML = "";

		// Create the add button element
		let addButton = document.createElement("li");
		addButton.id = "todo-list__add-button";
		addButton.innerHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
        `;

        // Append the add button back to the list
        listItems.appendChild(addButton);
        
        addButton.addEventListener("click", () => {
			this.openModal(ModalType.ITEM);
		});

        todoList.items.forEach((item) => {
            this.renderTodoItem(item)
        })

        this.updateListSelector();

		console.log(`WE OPENED ${todoList.title}`);
	}

	renderTodoItem(todoItem) {
        console.log(`We rendered ${todoItem.id}`)
    }

	bindEvents() {
		let listSelector = document.querySelector("#list_selector");

		listSelector.addEventListener("change", (event) => {
			let option = event.target;
			if (option.value == -1) {
				this.openModal(ModalType.LIST);
			} else if (option.value != 0) {
				let list = this.todoManager.findList(option.value);
				if (list) {
                    this.todoManager.currentListID = list.id;
					this.renderTodoList(list);
				}
			}

			listSelector.value = listSelector.options[0].value;
		});
	}
}
