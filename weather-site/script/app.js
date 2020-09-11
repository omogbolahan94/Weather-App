
window.addEventListener("load", () => {

    let input = document.querySelector("input#search"),
        button = document.querySelector("button#submit"),
        temperatureDescription = document.querySelector("#temperature-description > .des"),
        temperatureValue = document.querySelector("#temperature > span#temperature-value"),
        spanUnit = document.querySelector("span.unit"),
        city = document.querySelector(".city"),
        country = document.querySelector(".country"),
        locationIcon = document.querySelector('.weather-icon'),
        highLow1 = document.querySelector(".hl-1"),
        highLow2 = document.querySelector(".hl-2"),
        highLow1Unit = document.querySelector(".hl-1-unit"),
        highLow2Unit = document.querySelector(".hl-2-unit"),
        temperature = document.querySelector("div#temperature"); //temperature container
        desLoc = document.querySelector("#temperature-description > .des-loc");



   /* let itemsArray = localStorage.getItem('items') ?
        JSON.parse(localStorage.getItem('items')) :
        [];*/

    

    
       // localStorage.setItem('items', JSON.stringify(itemsArray));
    if (!localStorage) {
        localStorage.setItem("city", JSON.stringify(input.value)); //{"city": inputValue}
        localStorage.setItem("country", JSON.stringify(country.textContent));
        localStorage.setItem("temp", JSON.stringify(temperatureValue.textContent));
        localStorage.setItem("description", JSON.stringify(temperatureDescription.textContent));
        localStorage.setItem("low", JSON.stringify(highLow1.textContent));
        localStorage.setItem("high", JSON.stringify(highLow2.textContent));
        localStorage.setItem("desLoc", JSON.stringify(desLoc.textContent));
        
    }

    let proxy = "http://cors-anywhere.herokuapp.com/",
        key = `&appid=ee2798328aa7160fd1a37d3ad3a29b1a`,
        url = `${proxy}http://api.openweathermap.org/data/2.5/weather?q=`;
        unit = `&units=metric`;

  

    function weatherResult() {
        if (input.value) {
            api = url + input.value + key + unit;
            fetch(api)
                .then(response => { 
                    return response.json()
                })
                .then(data => {

                    console.log(data);
                    
                    //resetting the value of the DOM stored locally
                    temp = data.main.temp;
                    
                   /* itemsArray.push(data.name); //city name
                    itemsArray.push(temp);
                    itemsArray.push(data.weather[0].main);
                    itemsArray.push(data.sys.country);
                    itemsArray.push(data.main.temp_min);
                    itemsArray.push(data.main.temp_max);
                    itemsArray.push(data.name); //city name
                    
                    localStorage.setItem('items', JSON.stringify(itemsArray));

                    city.textContent = dataItems[0];
                    temperatureValue.textContent = dataItems[1];
                    temperatureDescription.textContent = dataItems[2];
                    country.textContent = dataItems[3];
                    highLow1.textContent = dataItems[4];
                    highLow2.textContent = dataItems[5];
                    desLoc.textContent = dataItems[6];*/
                    if (input.value) {
                        localStorage.setItem("city", JSON.stringify(input.value)); //{"city": inputValue}
                        localStorage.setItem("country", JSON.stringify(data.sys.country));
                        localStorage.setItem("temp", JSON.stringify(temp));
                        localStorage.setItem("description", JSON.stringify(data.weather[0].main));
                        localStorage.setItem("low", JSON.stringify(data.main.temp_min));
                        localStorage.setItem("high", JSON.stringify(data.main.temp_max));
                        localStorage.setItem("desLoc", JSON.stringify(data.name));
                        
                        city.textContent = JSON.parse(localStorage.getItem("city"));
                        temperatureValue.textContent = JSON.parse(localStorage.getItem("temp"));
                        temperatureDescription.textContent = JSON.parse(localStorage.getItem("description"));
                        country.textContent = JSON.parse(localStorage.getItem("country"));
                        highLow1.textContent = JSON.parse(localStorage.getItem("low"));
                        highLow2.textContent = JSON.parse(localStorage.getItem("high"));
                        desLoc.textContent = JSON.parse(localStorage.getItem("desLoc"));

                        locationIcon.innerHTML = `<img src="openweathermap-icons/icons/${data.weather[0].icon}.png">`;
                        temperature.addEventListener('click', celciusToFahrenheit);
                    }
            })
        }     
    } //end of weatherFunc



    button.addEventListener('click',  weatherResult) //calling the api through the buttlon click
    
    
    function celciusToFahrenheit() {
        let fahrenheit = Math.floor((9/5 * temp) + 32);

        if (spanUnit.textContent === 'C' && highLow1) {
            spanUnit.textContent = 'F';
            temperatureValue.textContent =  fahrenheit;
            highLow1.textContent = fahrenheit;
            highLow2.textContent = fahrenheit;
            highLow1Unit.textContent = 'F';
            highLow2Unit.textContent = 'F';

        } else {
            spanUnit.textContent = 'C';
            temperatureValue.textContent = temp;
            highLow1.textContent = temp;
            highLow2.textContent = temp;
            highLow1Unit.textContent = 'C';
            highLow2Unit.textContent = 'C';
        }
    } //end of celciusToFerhrenheit

   
        
})  //end of window load
