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
        inputs.forEach(input => {
            if (input.type === "checkbox" || input.type === "radio") {
                input.checked = false;
            } else {
                input.value = "";
            }
        });
    }

    updateListSelector() {
        const listSelector = document.querySelector("#list_selector");
        listSelector.innerHTML = "<option value=\"\">Select Todo List</option>"; // Clear existing options

        this.todoManager.lists.forEach(list => {
            const option = document.createElement("option");
            option.value = list.id;
            option.textContent = list.title;
            listSelector.appendChild(option);
        });

        // Add an option to create a new list
        const newListOption = document.createElement("option");
        newListOption.value = -1;
        newListOption.textContent = "Create New List";
        listSelector.appendChild(newListOption);
    }

	renderTodoList(todoList) {

    }

	renderTodoItem(todoItem) {}

	bindEvents() {
		let listSelector = document.querySelector("#list_selector");

		listSelector.addEventListener("change", (event) => {
			let option = event.target;
			if (option.value == -1) {
				this.openModal(ModalType.LIST);
			}

			listSelector.value = listSelector.options[0].value;
		});

		let itemAddButton = document.querySelector("#todo-list__add-button");

		itemAddButton.addEventListener("click", () => {
			this.openModal(ModalType.ITEM);
		});
	}
}
