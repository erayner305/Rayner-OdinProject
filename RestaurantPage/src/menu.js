export default function loadMenuPage() {
	let outputElem = document.createElement("div");
	outputElem.setAttribute("class", "wrapper");

	let menuTitle = document.createElement("h1");
	menuTitle.textContent = "Italian Menu";
	outputElem.appendChild(menuTitle);

	let menuItems = [
		{ name: "Spaghetti with Ketchup", description: "Classic spaghetti topped with ketchup.", price: "$8.99" },
		{ name: "Pepperoni Pizza with Pineapple", description: "Pepperoni pizza with a tropical twist.", price: "$12.99" },
		{ name: "Garlic Bread with Cheese Whiz", description: "Garlic bread topped with melted Cheese Whiz.", price: "$5.99" },
		{ name: "Caesar Salad with Ranch", description: "Caesar salad drizzled with ranch dressing.", price: "$7.99" },
		{ name: "Lasagna with BBQ Sauce", description: "Layers of pasta, meat, and BBQ sauce.", price: "$10.99" },
		{ name: "Tiramisu with Chocolate Syrup", description: "Traditional tiramisu topped with chocolate syrup.", price: "$6.99" }
	];

	menuItems.forEach(item => {
		let menuItemElem = document.createElement("div");
		menuItemElem.setAttribute("class", "menu-item");

		let itemName = document.createElement("h2");
		itemName.textContent = item.name;
		menuItemElem.appendChild(itemName);

		let itemDescription = document.createElement("p");
		itemDescription.textContent = item.description;
		menuItemElem.appendChild(itemDescription);

		let itemPrice = document.createElement("p");
		itemPrice.textContent = item.price;
		menuItemElem.appendChild(itemPrice);

		outputElem.appendChild(menuItemElem);
	});

	return outputElem;
}
