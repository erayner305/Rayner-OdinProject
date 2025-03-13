import "./style.css";

import TodoManager from "./modules/TodoManager";
import DOMManager from "./modules/DOMManager";

// import exampleTodoList from "./testing/todoExamples";

class App {
    constructor() {
        this.loadInitialData();
    }

	loadInitialData() {
        this.todoManager = new TodoManager();
        // this.todoManager.addList(exampleTodoList[0]);
        // this.todoManager.addList(exampleTodoList[1]);
        this.domManager = new DOMManager(this.todoManager);
    }

	bindGlobalEvents() {
    }
}

let app = new App();
console.log(app.todoManager);
