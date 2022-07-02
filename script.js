/* let weather = {
    "api_key": "7761786fe351ced2577dacabb4382e9c",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7761786fe351ced2577dacabb4382e9c")
        .then(response => response.json())..then((data) => console.log(data));
    }
}
 */

let weather = {
    api_key: "7761786fe351ced2577dacabb4382e9c",
    unit: "imperial",
    unit_symbol: "°F",
    city: "",
    searchWeather: function (city=this.city) {
        if (city == "") {
            return;
        }
        this.city=city;
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid="+this.api_key+"&units="+this.unit)
        .then(response => response.json())
        .then((data) => {
            if(data.cod == "404") {
                alert("City not found");
            } else {
            document.querySelector('.city').innerText = data.name;
            document.querySelector('.temp-number').innerText = Math.round(data.main.temp)+this.unit_symbol;
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




