import "./style.css";

class App {
	constructor() {
		this.targetIndexes = [
			{ id: "conditions", title: "Conditions", unit: "" },
			{ id: "feelslike", title: "Feels Like", unit: "°F" },
			{ id: "humidity", title: "Humidity", unit: "%" },
			{ id: "sunrise", title: "Sunrise", unit: "" },
			{ id: "sunset", title: "Sunset", unit: "" },
			{ id: "temp", title: "Temp", unit: "°F" },
			{ id: "windspeed", title: "Windspeed", unit: "MPH" },
		];

		this.renderWeatherData();
		this.bindEvents();
	}

	async fetchWeatherData(zipCode) {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?unitGroup=us&include=current&key=TDY5AEEZ3CBRBYUQQCFZEZ5JR&contentType=json`
		);
		const responseJSON = await response.json();
		console.log(responseJSON);
		return responseJSON.currentConditions;
	}

	async renderWeatherData(zipCode = 36830) {
		let weatherDataContainer = document.querySelector(".weather-data");
		weatherDataContainer.innerHTML = "";
		let weatherData = await this.fetchWeatherData(zipCode);

		// Cleans unused keys from response weather data
		// const filteredWeatherData = Object.keys(weatherData)
		// 	.filter((key) => this.targetIndexes.includes(key))
		// 	.reduce((obj, key) => {
		// 		obj[key] = weatherData[key];
		// 		return obj;
		// 	}, {});

		const filteredWeatherData = this.targetIndexes.map(
			({ id, title, unit }) => {
				let value = weatherData[`${id}`];
				if (id === "sunrise" || id === "sunset") {
					value = this.cleanAndConvertTime(value); // Clean and convert time
				}
				return { id, title, unit, value };
			}
		);

		filteredWeatherData.forEach(({ id, title, unit, value }) => {
			let weatherDataElem = document.createElement("div");
			weatherDataElem.setAttribute("id", id);
			weatherDataElem.setAttribute("class", "weather-data-block");

			let blockTitleElem = document.createElement("div");
			blockTitleElem.setAttribute("class", "block-title");
			blockTitleElem.textContent = title;

			weatherDataElem.appendChild(blockTitleElem);

			let blockDataElem = document.createElement("div");
			blockDataElem.setAttribute("class", "block-data");
			blockDataElem.textContent = `${value} ${unit}`;

			weatherDataElem.appendChild(blockDataElem);

			weatherDataContainer.appendChild(weatherDataElem);
		});
	}

	cleanAndConvertTime(timeString) {
		// Remove seconds
		const [hours, minutes] = timeString.split(":");

		// Convert to 12-hour format
		const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
		const period = hours < 12 ? "AM" : "PM";

		return `${hours12}:${minutes} ${period}`;
	}

	bindEvents() {
		let zipElem = document.querySelector("#zip");
		zipElem.addEventListener("input", (event) => {
			let textInput = event.target.value;
			const zipCode = parseInt(textInput);
			if (zipCode.toString().length == 5) {
				this.renderWeatherData();
			}
		});
	}
}

new App();
