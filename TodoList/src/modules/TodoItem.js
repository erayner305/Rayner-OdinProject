import {v4 as uuidv4} from 'uuid';

export default class TodoItem {
    /**
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     * @param {number} priority 
     */
	constructor(title, description, dueDate, priority, isChecked, id) {
		this.id = id || uuidv4();
		this.title = title;
		this.description = description || "";
		this.dueDate = dueDate || "";
		this.priority = priority || 0; // 0 - None; 1 - Low; 2 - Medium; 3 - High
		this.isChecked = isChecked || false;
	}
}
