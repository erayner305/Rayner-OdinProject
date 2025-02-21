export default function loadHomePage() {
	let outputElem = document.createElement("div");
	outputElem.setAttribute("class", "wrapper");

	let mainTitleElem = document.createElement("h1");
	mainTitleElem.textContent = 'Jonathan\'s "Italian"';

	let subTitleElem = document.createElement("h3");
	subTitleElem.textContent =
		"Where your food is as italian as the late Queen Elizabeth";

	outputElem.appendChild(mainTitleElem);
	outputElem.appendChild(subTitleElem);

	return outputElem;
}
