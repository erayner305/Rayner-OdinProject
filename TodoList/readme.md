I mostly just want to lay out some organization

This is a practice project for the odin project, intended to provide practice with applying SOLID principles and whatnot.

The application will provide a list of todos, stored in local storage which can be access when coming back to the page.

Basic Structure: 
- TodoList - Has a title, contains a list of TodoItems. Can be created, deleted, renamed
- TodoItem - Has a title, description, dueDate, and priority. All of these fields can be updated, the todo can be deleted, or moved to another TodoList (this should be handled above TodoList)