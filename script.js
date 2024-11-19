let apiKey = "d2d2d2a7afc2750e2d9814a6a6501cc5";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
const city = document.querySelector(".city");


async function validate(city){
    let response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    if(response.status == "404"){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        let img = document.createElement("img");
        img.src = "error.png";
        img.style.height = "400px";
        img.style.width = "450px";
        document.querySelector(".error").appendChild(img);
    }
    if(response.status == "400"){
        document.querySelector(".weather").style.display = "none";
    }
    else{
        let data = await response.json();
        console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".Wind").innerHTML =  data.wind.speed + " km/hr";
    
        if(response.status == "404"){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
    
        if(data.weather[0].main == "Clouds"){
            weathericon.src = "clouds.png";
            document.querySelector(".weather-icon").style = 'width:400px';
        }
        if(data.weather[0].main == "Clear"){
            weathericon.src = "clear.png";
            document.querySelector(".weather-icon").style = 'width:200px';
        }
        if(data.weather[0].main == "Drizzle"){
            weathericon.src = "drzzle.png";
        }
        if(data.weather[0].main == "Rain"){
            weathericon.src = "cloud2.png";
            document.querySelector(".weather-icon").style = 'width:200px'
        }
        if(data.weather[0].main == "Mist"){
            weathericon.src = "mist.png";
            document.getElementById("wthr").style = 'width: 300px';
        }
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

btn.addEventListener("click",() => {
    validate(searchBox.value);
});