window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDgree = document.querySelector('.temperature-degree');
    let locationTiemzone = document.querySelector('.location-timezone');
     let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=46a3ef3a6fa2671e750756c9d3106ac5`;
            fetch(api)
                .then(response => {
                    return response.json();

                })
                .then(data => {
                    const temp = Math.floor(data.main.temp*(9/5) -459.67) ;

                    //Set DOM elements from the api 
                    temperatureDgree.textContent = temp + '˚';
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTiemzone.textContent = data.name;
                    const icon = data.weather[0].icon;

                    // Formula for celsuis 
                    let celsius = (temp -32)*(5/9);
                    //Set Icon
                    setIcons(icon,document.querySelector('.icon'));
                    // change temperature to celsius/farhenheit
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent=== "F"){
                            temperatureSpan.textContent = "C" ;
                            temperatureDgree.textContent = Math.floor(celsius) + '˚';
                        } else if (temperatureSpan.textContent === "C"){
                            temperatureSpan.textContent = "F";
                            temperatureDgree.textContent = temp + '˚';

                        }

                    });


                });
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        var currentIcon = icon ;
        switch(currentIcon){
            case "01d":
            currentIcon= "CLEAR_DAY";
            break;
            case "01n":
             currentIcon = "CLEAR_NIGHT";
            break;
            case "02d":
             currentIcon = "PARTLY_CLOUDY_DAY";
            break;
            case "02n":
             currentIcon = "PARTLY_CLOUDY_NIGHT";
            break;
            case "03d":
            currentIcon = "CLOUDY";
            break;
            case "09d":
             currentIcon = "RAIN";
            break;
            case "13d":
             currentIcon = "SNOW";
            break;
            case "50d":
            currentIcon = "FOG";
            break;
        }
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});