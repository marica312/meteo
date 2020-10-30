let appId = 'f425ede557ee65454e9dbd6747698ca4';
let units = 'metric';
let lang = 'it'
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.lenght === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
    else
    searchMethod = 'q';
    
}


function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
   fetch( `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units${units}&lang=${lang}`).then(result => {
       return result.json();
   }) .then(result => {init(result);

})
    
}

function init(resultFromServer) {
    let weatherContainer= document.getElementById('weatherContainer')
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            weatherContainer.style.backgroundImage= 'url("sunny.jpg")';
            break;
    
        case 'Clouds':
            weatherContainer.style.backgroundImage= 'url("cloud.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':  
           weatherContainer.style.backgroundImage= 'url("rain.jpg")';
            break;  

        case 'Snow' :
          weatherContainer.style.backgroundImage= 'url("snow.jpg")' ; 
            break;   
            

        case 'Mist' :
        case 'Fog' :   
          weatherContainer.style.backgroundImage= 'url("fog.jpg")';
          break;  

          case 'Thunderstorm' :   
           weatherContainer.style.backgroundImage= 'url("storm.jpg")';
          break;

         default:
             break;     

    }   
    
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let  weatherIcon = document.getElementById('documentIconImg')
    
    weatherIcon.src='http://openweathermap.org/img/wn/'+resultFromServer.weather[0].icon+'.png';
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp-273) + '&#176';
    windSpeedElement.innerHTML='Vento a '+ '' +Math.floor(resultFromServer.wind.speed*3.6)+' km/h';
    cityHeader.innerHTML=resultFromServer.name;
    humidityElement.innerHTML='Umidità '+resultFromServer.main.humidity +'%'

    searchVisibleContainer()
       
}
    function searchVisibleContainer () { 
        let weatherContainer= document.getElementById('weatherContainer');
        let weatherContainerHeight = weatherContainer.clientHeight;
        let weatherContainerWidth = weatherContainer.clientWidth;

        weatherContainer.style.left = `calc(50% - ${weatherContainerHeight/2}px)`;
        weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
        weatherContainer.style.visibility = 'visible';

        
    }
         
    


 document.getElementById('searchBtn').addEventListener('click',()=>{
     let searchTerm = document.getElementById('searchInput').value;
     if (searchTerm)
     searchWeather(searchTerm)
 })  
 