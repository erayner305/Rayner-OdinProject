const root = document.documentElement;
const container = document.querySelector("#container");
let dimension = 16;

function buildGrid(dimension) {
	container.innerHTML = "";
	const gridItemDimension = 100 / dimension;
	for (let i = 1; i <= dimension * dimension; i++) {
		const gridItem = document.createElement("div");
		gridItem.setAttribute("class", "grid-item");
		gridItem.setAttribute("id", `grid-${i}`);
		gridItem.style.minWidth = `${gridItemDimension}%`;
		gridItem.style.maxHeight = `${gridItemDimension}%`;
		container.appendChild(gridItem);
	}
}

buildGrid(dimension);

let updateButton = document.querySelector("#submit_dimension");
updateButton.addEventListener("click", () => {
	dimension = document.querySelector("#dimension").value;
	if (dimension < 100 && dimension > 0) {
		buildGrid(dimension);
	}
});

let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => buildGrid(dimension))

let isLeftMouseDown = false;
let isRightMouseDown = false;

container.addEventListener("mousedown", (event) => {
	event.preventDefault();
	switch (event.button) {
		case 0:
			event.target.style.backgroundColor = "black";
			isLeftMouseDown = true;
			break;
		case 2:
			event.target.style.backgroundColor = "gray";
			isRightMouseDown = true;
			break;
	}
});

document.addEventListener("mouseup", () => {
	isLeftMouseDown = false;
	isRightMouseDown = false;
});

container.addEventListener("mouseover", (event) => {
	if (event.target.hasAttribute("class", "grid-item")) {
		if (isLeftMouseDown) {
			event.target.style.backgroundColor = "black";
		} else if (isRightMouseDown) {
			event.target.style.backgroundColor = "gray";
		}
	}
});

container.addEventListener("contextmenu", (event) => {
	event.preventDefault();
});
