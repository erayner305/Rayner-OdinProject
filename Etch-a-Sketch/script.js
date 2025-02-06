const root = document.documentElement;
const container = document.querySelector("#container");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const DEFAULT_DIMENSION = 16;
let dimension = DEFAULT_DIMENSION;
let color = "#000000";
const BACKGROUND_COLOR = "white";

function buildGrid(dimension, isLoad) {
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

	if (!isLoad) {
		const url = new URL(window.location);
		url.searchParams.delete("gridState");
		window.history.replaceState(null, "", url.toString());
	}
}

function loadGridFromState(state) {
	console.log(state)
	const { gridState, gridDimension } = state;
	if (gridDimension) {
		console.log(true)
		dimension = gridDimension; 
	}
	console.log(dimension)
	buildGrid(dimension, true);
	const gridItems = document.querySelectorAll(".grid-item");
	gridItems.forEach((item, index) => {
		item.style.backgroundColor = gridState[index];
	});
}

function getGridState(gridDimension) {
	const gridItems = document.querySelectorAll(".grid-item");
	const gridState = Array.from(gridItems).map(
		(item) => item.style.backgroundColor
	);
	return { gridState, gridDimension };
}

function encodeGridState(gridState) {
	const compressedState = LZString.compressToEncodedURIComponent(
		JSON.stringify(gridState)
	);
	return compressedState;
}

function decodeGridState(encodedState) {
	const decompressedState =
		LZString.decompressFromEncodedURIComponent(encodedState);
	return JSON.parse(decompressedState);
}

function saveGridStateToURL(gridDimension) {
	const gridState = getGridState(gridDimension);
	const encodedState = encodeGridState(gridState);
	const url = new URL(window.location);
	url.searchParams.set("gridState", encodedState);
	window.history.replaceState(null, "", url.toString());
}

function loadGridStateFromURL() {
	const urlParams = new URLSearchParams(window.location.search);
	const encodedState = urlParams.get("gridState");
	if (encodedState) {
		const gridState = decodeGridState(encodedState);
		loadGridFromState(gridState);
	} else {
		buildGrid(dimension, true)
	}
}

// buildGrid(dimension, true);

let updateButton = document.querySelector("#submit_dimension");
updateButton.addEventListener("click", () => {
	dimension = document.querySelector("#dimension").value;
	if (dimension <= 100 && dimension > 0) {
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
	saveGridStateToURL(dimension);
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

document.querySelector("#share").addEventListener("click", () => {
	saveGridStateToURL(dimension); // Ensure the URL is updated with the latest grid state
	const longURL = window.location.href;
	try {
		navigator.clipboard.writeText(longURL);
		alert("URL copied to clipboard!");
	} catch (error) {
		alert("Failed to copy URL. Please try again.");
	}
});

window.addEventListener("load", loadGridStateFromURL);
