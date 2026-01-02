function formatHour(time){
    return new Date(time).toLocaleTimeString([], {
        hour: '2-digit',
        minute:'2-digit',
        hour12: true
    })                                                                                          
}


function formatDay(date){
    return new Date(date).toLocaleDateString([],{weekday: 'short'});
}

function getweather(){
    const city = document.getElementById("city").value;

}

fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(response => response.json())
    .then(loc => {
        if (!loc.results || loc.results.length === 0) {
            return alert("City not found");
        }
        const { latitude, longitude, name, country } = loc.results[0];
        document.getElementById("city-name").innerText = `${name}, ${country}`;
    })
    .catch(error => console.error("Error fetching city data:", error));
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
    .then(response => response.json())
    .then(weather => {
        console.log(weather);
        document.getElementById("temp").innerText = `${weather.current_weather.temperature}℃`;
        const hourlyDiv = document.getElementById("Hourly");
        hourlyDiv.innerHTML = "";
        for(let i=0; i<24; i++){                                    
            const hour = weather.hourly.time[i];
            const temp = weather.hourly.temperature_2m[i];
            hourlyDiv.innerHTML += `<div class="hour-card">
                <h3>${formatHour(hour)}</h3>
                <p>${temp}℃</p>
            </div>`;
        }
        const dailyDiv = document.getElementById("Daily");
        dailyDiv.innerHTML = "";                
        for(let i=0; i<7; i++){
            const date = weather.daily.time[i]; 
            const tempMax = weather.daily.temperature_2m_max[i];
            const tempMin = weather.daily.temperature_2m_min[i];
            dailyDiv.innerHTML += `<div class="day-card">
                <h3>${formatDay(date)}</h3>
                <p>Max: ${tempMax}℃</p>
                <p>Min: ${tempMin}℃</p>
            </div>`;
        }
    })
    .catch(error => console.error("Error fetching weather data:", error));
    


