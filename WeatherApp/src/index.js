import "./style.css";

class App {
	constructor() {
		this.targetIndexes = [
			{id: "conditions", unit: ""},
            {id: "feelslike", unit: "°F"},
            {id: "humidity", unit: "%"},
            {id: "sunrise", unit: "AM"},
            {id: "sunset", unit: "PM"},
            {id: "temp", unit: "°F"},
            {id: "windspeed", unit: "MPH"},
		];

		this.renderWeatherData();
	}

	async fetchWeatherData(zipCode) {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?unitGroup=us&include=current&key=TDY5AEEZ3CBRBYUQQCFZEZ5JR&contentType=json`
		);
		const responseJSON = await response.json();
		console.log(responseJSON);
		return responseJSON.currentConditions;
	}

	async renderWeatherData() {
        let weatherDataContainer = document.querySelector(".weather-data");
		let weatherData = await this.fetchWeatherData(36830);

		// Cleans unused keys from response weather data
		// const filteredWeatherData = Object.keys(weatherData)
		// 	.filter((key) => this.targetIndexes.includes(key))
		// 	.reduce((obj, key) => {
		// 		obj[key] = weatherData[key];
		// 		return obj;
		// 	}, {});

        const filteredWeatherData = this.targetIndexes.map(({id, unit}) => {
            return {id, unit, value: weatherData[`${id}`]}
        })

        filteredWeatherData.forEach(({id, unit, value}) => {
            let weatherDataElem = document.createElement("div");
            weatherDataElem.setAttribute("id", id);
            weatherDataElem.setAttribute("class", "weather-data-block");

            let blockTitleElem = document.createElement("div");
            blockTitleElem.setAttribute("class", "block-title");
            blockTitleElem.textContent = id;

            weatherDataElem.appendChild(blockTitleElem);

            let blockDataElem = document.createElement("div");
            blockDataElem.setAttribute("class", "block-data");
            blockDataElem.textContent = `${value} ${unit}`;

            weatherDataElem.appendChild(blockDataElem);


            weatherDataContainer.appendChild(weatherDataElem);
        })
    
	}

    updateUIWithWeatherData() {
        const weatherDataContainer = document.querySelector(".weather-data");
        weatherDataContainer.innerHTML = `
            <div></div>
        `
    }
}

new App();
