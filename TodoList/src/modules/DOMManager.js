import TodoManager from "./TodoManager";

export default class DOMManager {

    constructor() {
        this.currentModal;

        this.bindEvents();
    }

    /**
     * 
     * @param {string} modalType "list" or "item"
     * @param {*} data?
     */
	openModal(modalType, data) {
        let modal = document.querySelector(`#${modalType}_modal`);

        let cancelBtn = modal.querySelector("#modal-cancel");
        cancelBtn.addEventListener("click", (event) => {
            this.closeModal();
        })

        let createBtn = modal.querySelector(`#${modalType}-create`);
        createBtn.addEventListener("click", (event) => {
            // probably need a function to gather all the data here
            // will call TodoManager.addList or TodoManager.lists[x].addItem
            this.closeModal();
        })

        modal.showModal();
    }

	closeModal() {}

	renderTodoList(todoList) {}

	renderTodoItem(todoItem) {}

	bindEvents() {
        let listSelector = document.querySelector("#list_selector");

        listSelector.addEventListener("change", (event) => {
            let option = event.target;
            if (option.value == -1) {
                this.openModal("list");
            }
        })
    }
}
