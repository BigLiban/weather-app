//var key = ceabbdd74ac02ed567f60f8adedc7adf;


const init = () => {
    document.getElementById('btnCurrentLocation').addEventListener('click', getLocation);
    document.getElementById('btnGetWeather').addEventListener('click', fetchWeather);
    document.getElementById('btnChangeTheme').addEventListener('click', changeTheme);
}
const fetchWeather = (ev) => {
    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;
    let key = '378a6dcf2a180fcbd860e8f180c66db7';
    let lang = 'en';
    let units = 'metric';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    
    //fetch the weather
    fetch(url) //I dont really undestand the stuff below
        .then(response => response.json())
        .then(data=>{
            showWeather(data)
        })
        .catch(console.err);
}
const getLocation = (ev) => {
    let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10, 
        maximumAge: 1000 * 60 * 5,
    };

    navigator.geolocation.getCurrentPosition(success, fail, opts);
    
}
const success = (position) => {
    document.getElementById('latitude').value = position.coords.latitude.toFixed(2);
    document.getElementById('longitude').value = position.coords.longitude.toFixed(2);
}
const fail = (err) => {
    console.error(err);
}
const showWeather = (resp) => {
    console.log(resp);
    let weather = document.querySelector('.weather');
    //let location = document.querySelector('.location');
    //clear out the old weather and add the new.
    weather.innerHTML = resp.list.map((day, idx) => {
        if(idx <= 3) {
            let dt = new Date(day.dt * 1000);

            return `<div class="col">
            <div class="card">
                <div class="card-top">
                    <h5>${dt.toDateString()}</h5>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Description">
        
                </div>
                <div class="card-body">
                    <h3 class="card-title">${day.main.temp}˚C</h3>
                    <p class="card-text"></p>
                    <p class="card-text">Humidity: ${day.main.humidity}</p>
                    <p class="card-text">${day.main.temp_max}˚C</p>
                    <p class="card-text">${day.main.temp_min}˚C</p>
                    <p class="card-text">${day.weather[0].description}</p>
                </div>
        
            </div>
        </div>`;
        } 
    }).join(' ');

}
const changeTheme = () => { //Changes the apps color theme
    document.querySelector('.navbar').classList.toggle('navbar-darkbg');
    document.querySelector('body').classList.toggle('body-darkbg');
    document.querySelector('.navbar-brand').classList.toggle('navbar-brightlogo');
}


init();