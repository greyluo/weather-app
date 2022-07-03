
let weather = {
    api_key: key, // API key
    unit: "imperial",
    unit_symbol: "°F",
    city: "",
    humidity: "",
    searchWeather: function (city = this.city) {
        if (city == "") {
            return;
        }
        this.city = city;
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.city + "&appid=" + this.api_key + "&units=" + this.unit)
        .then(response => response.json())
        .then((data) => {
            if(data.cod == "404") {
                alert("City not found");
            } else {
            document.querySelector('.city').innerText = data.name;
            document.querySelector('.temp-number').innerText = Math.round(data.main.temp)+this.unit_symbol;
            document.querySelector('.humidity').innerText = "Humidity:"+data.main.humidity+"%";
            if((data.weather.main == "Thunderstorm")|| data.weather[0].main == "Drizzle"|| data.weather[0].main == "Rain"
            || data.weather[0].main == "Snow"|| data.weather[0].main == "Clouds"|| data.weather[0].main == "Clear"){
                document.body.style.backgroundImage = "url('./img/"+data.weather[0].main+".jpg')";
            }
            if(data.weather[0].id > 700&&data.weather[0].id<800){
                document.body.style.backgroundImage = "url('./img/mist.jpg')";
            }
            document.querySelector('.card').style.opacity = "0.6";
            }
        });
    }
}

document.querySelector('.search-bar').addEventListener('change',(e)=>{
        weather.searchWeather(e.target.value);
} );

document.querySelector('.C').addEventListener('click',()=>{
    weather.unit="metric";
    weather.unit_symbol="°C";
    if(weather.city!="") {
        weather.searchWeather();
    }
});
document.querySelector('.F').addEventListener('click',()=>{
    weather.unit="imperial";
    weather.unit_symbol="°F";
    if(weather.city!="") {
        weather.searchWeather();
    }
});




