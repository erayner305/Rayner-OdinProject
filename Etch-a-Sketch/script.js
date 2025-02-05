const root = document.documentElement;
const container = document.querySelector("#container");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let dimension = 16;
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

function loadGridFromState(gridState) {
	const gridItems = document.querySelectorAll(".grid-item");
	gridItems.forEach((item, index) => {
		item.style.backgroundColor = gridState[index];
	});
}

function getGridState() {
	const gridItems = document.querySelectorAll(".grid-item");
	return Array.from(gridItems).map((item) => item.style.backgroundColor);
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

function saveGridStateToURL() {
	const gridState = getGridState();
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
	}
}

async function shortenURL(longURL) {
	const accessToken = "691b7c378da8430ab0e8c9395b1ad78e10ed7e5e"; // Replace with your Bitly access token
	try {
		const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ long_url: longURL }),
		});
		if (!response.ok) {
			const errorData = await response.json();
			console.error("Error shortening URL:", errorData);
			throw new Error(
				`Error shortening URL: ${response.status} ${response.statusText}`
			);
		}
		const data = await response.json();
		return data.link;
	} catch (error) {
		console.error("Failed to shorten URL:", error);
		throw error;
	}
}

buildGrid(dimension, true);

// let updateButton = document.querySelector("#submit_dimension");
// updateButton.addEventListener("click", () => {
// 	dimension = document.querySelector("#dimension").value;
// 	if (dimension <= 24 && dimension > 0) {
// 		buildGrid(dimension);
// 	}
// });

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
	saveGridStateToURL();
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

document.querySelector("#share").addEventListener("click", async () => {
	saveGridStateToURL(); // Ensure the URL is updated with the latest grid state
	const longURL = window.location.href;
	try {
		const shortURL = await shortenURL(longURL);
		await navigator.clipboard.writeText(shortURL);
		alert("Shortened URL copied to clipboard!");
	} catch (error) {
		navigator.clipboard.writeText(longURL);
		alert("Failed to shorten URL. Long URL copied to clipboard instead.");
	}
});

window.addEventListener("load", loadGridStateFromURL);
