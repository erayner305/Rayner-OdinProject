const myLibrary = [];

class Book {
	constructor(title, author, pages, isRead) {
		this.title = title || "";
		this.author = author || "";
		this.pages = pages || 0;
		this.isRead = isRead || false;
	}

	get info() {
		return `${this.title} by ${this.author}, ${pages} pages, ${
			this.isRead ? "read" : "not read yet"
		}`;
	}

	toggleReadStatus = () => {
		this.isRead = !this.isRead;
	};
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

function removeBookFromLibrary(index) {
	myLibrary.splice(index, 1);
}

// ---- DOM Manipulation ----

// Handles displaying and updating library in table
const libraryTable = document.querySelector(".library");

function addBookToLibraryTable(book, id) {
	const bookElement = document.createElement("div");
	bookElement.setAttribute("class", "book");
	bookElement.setAttribute("data-attribute", id);

	const bookTitleElement = document.createElement("div");
	bookTitleElement.textContent = book.title;

	const bookAuthorElement = document.createElement("div");
	bookAuthorElement.textContent = book.author;

	const bookPagesElement = document.createElement("div");
	bookPagesElement.textContent = book.pages;

	const bookIsReadElement = document.createElement("div");
	bookIsReadElement.textContent = book.isRead ? "Read" : "Unread";
	bookIsReadElement.setAttribute("class", "status");

	bookIsReadElement.addEventListener("click", (event) => {
		const bookElement = event.target.parentElement;
		let isRead = myLibrary[bookElement.getAttribute("data-attribute")].isRead;
		myLibrary[bookElement.getAttribute("data-attribute")].isRead = !isRead;
		event.target.textContent = !isRead ? "Read" : "Unread";
	});

	const bookDeleteElement = document.createElement("div");
	const bookDeleteButton = document.createElement("button");
	bookDeleteButton.textContent = "Remove";
	bookDeleteButton.setAttribute("class", "delete-book");

	bookDeleteButton.addEventListener("click", (event) => {
		const bookElement = event.target.parentElement;
		const bookIndex = bookElement.getAttribute("data-attribute");
		removeBookFromLibrary(bookIndex);
		populateLibraryTable(myLibrary);
		console.log(myLibrary);
	});

	bookDeleteElement.append(bookDeleteButton);

	bookElement.append(
		bookTitleElement,
		bookAuthorElement,
		bookPagesElement,
		bookIsReadElement,
		bookDeleteElement
	);

	libraryTable.append(bookElement);
}

function populateLibraryTable(library) {
	clearLibraryTable();
	library.forEach((book, index) => {
		addBookToLibraryTable(book, index);
	});
}

function clearLibraryTable() {
	const columnHeaders = libraryTable.querySelector(".column-headers");
	libraryTable.innerHTML = "";
	libraryTable.appendChild(columnHeaders);
}

// Handles submission of dialogue data
const newBookButton = document.querySelector(".new-book");
const submitBookButton = document.querySelector("#submit-book");
const newBookDialogue = document.querySelector(".new-book-form");
const newBookForm = newBookDialogue.querySelector("form");

newBookButton.addEventListener("click", () => {
	newBookDialogue.showModal();
});

submitBookButton.addEventListener("click", (event) => {
	event.preventDefault();

	const formElements = newBookDialogue.querySelectorAll("input");
	let isInputValid = true;
	formElements.forEach((inputElem) => {
		if(inputElem.validity.valueMissing) {
			console.error(`INVALID ENTRY AT ${inputElem.id}`);
			alert(`Invalid entry at ${inputElem.id}`)
			isInputValid = false
		}
	})

	if (isInputValid) {
		const title = formElements[0].value;
		const author = formElements[1].value;
		const pages = formElements[2].value;
		const isRead = formElements[3].checked;
	
		const newBook = new Book(title, author, pages, isRead);
		addBookToLibrary(newBook);
		addBookToLibraryTable(newBook, myLibrary.length - 1);
	
		newBookDialogue.close();
		newBookForm.reset();
	}
});

// Creating four books
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
let book2 = new Book("1984", "George Orwell", 328, false);
let book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
let book4 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);

// Adding books to the library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

// Initialize Table
populateLibraryTable(myLibrary);
