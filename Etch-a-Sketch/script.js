const root = document.documentElement;
const container = document.querySelector("#container");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let dimension = 16;
let color = "#000000";
const BACKGROUND_COLOR = "white";

function buildGrid(dimension) {
	container.innerHTML = "";
	canvas.width = container.clientWidth;
	canvas.height = container.clientHeight;

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
resetButton.addEventListener("click", () => buildGrid(dimension));

let isLeftMouseDown = false;
let isRightMouseDown = false;

container.addEventListener("mousedown", (event) => {
	event.preventDefault();
	switch (event.button) {
		case 0:
			event.target.style.backgroundColor = color;
			isLeftMouseDown = true;
			break;
		case 2:
			event.target.style.backgroundColor = BACKGROUND_COLOR;
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
			event.target.style.backgroundColor = color;
		} else if (isRightMouseDown) {
			event.target.style.backgroundColor = BACKGROUND_COLOR;
		}
	}
});

container.addEventListener("contextmenu", (event) => {
	event.preventDefault();
});

let colorPicker = document.querySelector("#color");
colorPicker.addEventListener("input", (event) => {
	color = event.target.value;
});

document.querySelector("#save").addEventListener("click", () => {
	const gridItems = document.querySelectorAll(".grid-item");
	const gridItemDimension = container.clientWidth / dimension;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	gridItems.forEach((item, index) => {
			const x = (index % dimension) * gridItemDimension;
			const y = Math.floor(index / dimension) * gridItemDimension;
			ctx.fillStyle = item.style.backgroundColor || BACKGROUND_COLOR;
			ctx.fillRect(x, y, gridItemDimension, gridItemDimension);
	});

	const link = document.createElement("a");
	link.download = "canvas.jpg";
	link.href = canvas.toDataURL("image/jpeg");
	link.click();
});
