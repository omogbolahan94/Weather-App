let input = document.querySelector("input#search"),
    button = document.querySelector("button#submit"),
    content = document.getElementById("row")
    icon = document.querySelector('#icon'),
    city = document.getElementsByClassName("city"),
    country = document.querySelector("#country"),
    temperature = document.querySelector("#temp"),
    tempUnit = document.querySelector(".temp-unit"),
    desc = document.querySelector("desc"),
    highLow1 = document.querySelector(".hl-1"),
    highLow2 = document.querySelector(".hl-2"),
    highLow1Unit = document.querySelector(".hl-1-unit"),
    highLow2Unit = document.querySelector(".hl-2-unit");
    //form = document.querySelector("#form"); //temperature container
    


//if the localStorage key("weatherDarta") does not exist already, create an empty array
//else get weatherData from localStorage and convert the JSON data to pure array of JS objects
let weatheArray = JSON.parse(localStorage.getItem("weatherData")) || []; 

document.addEventListener("DOMContentLoaded", function () {
    getWeatherContent(weatheArray);
    console.log(weatheArray);
})


let proxy = "http://cors-anywhere.herokuapp.com/",
    key = `&appid=ee2798328aa7160fd1a37d3ad3a29b1a`,
    url = `${proxy}http://api.openweathermap.org/data/2.5/weather?q=`;
    unit = `&units=metric`;

  

function weatherResult(destination) {
        
    api = url + destination + key + unit;
    
    fetch(api)
        .then(response => { 
            return response.json()
        })
        .then(data => {
            weatheArray.unshift(data); //using unshift instead of push to add the JSON data into the index 0 ofweather array 
            console.log(data);
            console.log(weatheArray);
            //converting the list of object to JSON and storing it in local storage with key name "weatherData"
            localStorage.setItem("weatherData", JSON.stringify(weatheArray)); 
            //reloading the page after 3500ms once the data is stored in localStorage instead of reloading it 
            setTimeout( () => {
                location.reload();
            }, 3500); 
        })
        .catch(error => {
            console.log(error);
        });
}  //end of weatherResult


//function that updates the html file
const getWeatherContent = (arr) => {
    let mappedArr = arr.map( (data) => {
        return `<div id="location" class="col-lg-3">
                    <p><span class="city">${data.name}</span><span>/</span><span id="country">${data.sys.country}</span> </p>
            
                </div>

                <div id="icon">
                    <!-- <img src="openweathermap-icons/icons/unknown.png" /> -->
                </div>

                <div id="temperature" class="col-lg-3 temperatur-unit">
                    
                    <span id="temp">${data.main.temp}</span>
                    <span class="degree">&deg;</span>
                    <span class="temp-unit">C</span>
                    
                </div>

                <div id="description" class="col-lg-3">
                    It's <span id="desc">${data.weather.map(item => item.description)}</span> in
                <span class="city">${data.name}</span>
                now
                </div>

                <div class="high-low" class="col-lg-3">
                    
                    <span class="hl-1">${data.main.temp_min}</span>  
                    <span class="degree">&deg;</span>
                    <span class="hl-1-unit">C</span>
                    /
                    <span class="hl-2">${data.main.temp_max}</span>  
                    <span class="degree">&deg;</span>  
                    <span class="hl-2-unit">C</span>

                </div>`

    })

    //mappedArr = mappedArr.join(""); //converts array to string
    content.innerHTML = mappedArr;
}  //END OF getWeatherContent




//function that calls the api
function handleSubmit(e) {
    e.preventDefault();

    //passing input.value which is our destination into the weatherResult and calling it when the handler is triggered by clicking the button 
    weatherResult(input.value);

    //also calling the getWeastherContent
    getWeatherContent(weatheArray);

    console.log(input.value, " :location submitted");

    
    input.value = ""; 

} //END OF HANDLER FUNCTION
                
                        
        

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


button.addEventListener('click', handleSubmit); //calling the api through the buttlon click
//temperature.addEventListener('click', celciusToFahrenheit);
    
 //icon.innerHTML = `<img src="openweathermap-icons/icons/${data.weather[0].icon}.png">`;   

