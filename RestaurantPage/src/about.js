export default function loadAboutPage() {
	let outputElem = document.createElement("div");
	outputElem.setAttribute("class", "wrapper");

    let aboutTitle = document.createElement("h1");
    aboutTitle.textContent = "About Us";

    let aboutContent = document.createElement("h3");
    aboutContent.textContent = "Who reaaaaaally knows if we're italian. We might be? So what if the DNA results says there's no italian - what do they know!?"

    outputElem.appendChild(aboutTitle);
    outputElem.appendChild(aboutContent);
	return outputElem;
}
