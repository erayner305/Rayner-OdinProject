import "./style.css";

import TodoManager from "./modules/TodoManager";
import DOMManager from "./modules/DOMManager";

import exampleTodoList from "./testing/todoExamples";

class App {
    constructor() {
        this.loadInitialData();
    }

	loadInitialData() {
        let localLists = null; // localStorage.getItem(lists)
        this.todoManager = new TodoManager(exampleTodoList);
        this.domManager = new DOMManager();
    }

	bindGlobalEvents() {
    }
}

let app = new App();
console.log(app.todoManager);
