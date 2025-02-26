export default class TodoItem {
    /**
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     * @param {number} priority 
     */
	constructor(id, title, description, dueDate, priority) {
		this.id = id;
		this.title = title;
		this.description = description || "";
		this.dueDate = dueDate || "";
		this.priority = priority || 0; // 0 - None; 1 - Low; 2 - Medium; 3 - High
		this.isChecked = false;
	}
}
