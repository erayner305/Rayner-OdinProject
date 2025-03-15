import "./style.css";

import TodoManager from "./modules/TodoManager";
import DOMManager from "./modules/DOMManager";

class App {
    constructor() {
        this.loadInitialData();
    }

	loadInitialData() {
        this.todoManager = new TodoManager();
        this.domManager = new DOMManager(this.todoManager);
    }

	bindGlobalEvents() {
    }
}

let app = new App();
console.log(app.todoManager);
