document.addEventListener("DOMContentLoaded", function() {
    const cityInput = document.querySelector(".search");
    const searchbtn = document.querySelector(".search-btn");
    const temp=document.querySelector(".temp");
    const location=document.querySelector(".location");
    const weatherImg=document.querySelector(".weather-icon");
    const humidValue=document.querySelector("#humid-val");
    const windValue=document.querySelector("#wind-val");

    fetchWeather("Mumbai");

    function validateCity(city) {
        if(city.trim() === ""){
            alert("City name cannot be empty.");
            return false;
        }
        return true;
    }

    async function fetchWeather(city) {
        const key="8772a402bd564ecd9dc170023251501";
        const url =`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;

        try{
            const response= await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch Weather details.");
            }
            const data = await response.json();
            if(data.error){
                alert("City not found.");
                return;
            }
            console.log(data);
            updateStats(data);
        }
        catch(error){
            alert(error);
        }
    }

    function checkImageExists(imageName, callback) {
        const img = new Image();
        img.onload = function () {
          callback(true);  // Image exists
        };
        img.onerror = function () {
          callback(false); // Image does not exist
        };
        img.src = imageName;
    }

    function updateStats(data){
        temp.textContent=`${data.current.temp_c}°C`;
        location.textContent= data.location.name;
        humidValue.textContent=`${data.current.humidity}%`;
        windValue.textContent=`${data.current.wind_kph} km/h`;
        // check if image with particular name exists
        
        const imageName = `${data.current.condition.text}.png`;
        checkImageExists(imageName, function(exists) {
        if (exists) {
            weatherImg.src=`${data.current.condition.text}.png`;
        } else {
            weatherImg.src= data.current.condition.icon;
        }
        });
        console.log(data.current.condition.text);
    }

    searchbtn.addEventListener("click", function() {
        const city = cityInput.value;
        console.log("City name: ", city);
        if (validateCity(city)) {
            fetchWeather(city);
        }
    });
});