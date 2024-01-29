//Traveler enters city name and clicks search button
$("#search-button").on("click",function(event){
    event.preventDefault();
    $("#weather").empty();
    $("#current-weather").empty();
    var cityname=$("#search-input").val().trim().toUpperCase();;
    //Calling create city buttons function so that traveler can reuse those
    createCityButton(cityname);

    //Saving city name in local storage
var cityValue=localStorage.getItem("cities")
var savedCities=JSON.parse(cityValue);

if (savedCities === null) {
    savedCities = [];
  }

savedCities.push(cityname);

localStorage.setItem("cities",JSON.stringify(savedCities));

// Calling the weather api to return results
weatherAPICall(cityname);

});

function weatherAPICall(cityname){
   
    var APIKey= "166a433c57516f51dfab1f7edaed8413";
    var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname + "&appid=" + APIKey;

 //Date format expected Year, Month and day

var currentdate=dayjs().format("YYYY-MM-DD");

var h1=$("<h1>");
h1.text(`${cityname} (${currentdate})`);
$("#current-weather").append(h1);


fetch(queryURL)
.then(function(response){
return response.json();

})
.then(function(data){
    //Passing the data response received from the API and calling get weatherdetails function
    getWeatherDetails(data);

});
}


function getWeatherDetails(data){
    $("#fivedayTitle").attr("style", "display: block");

// Displaying correct icon from API
var iconTag=$("<img>");
var iconImg= data.list[1].weather[0].icon;
var iconurl="https://openweathermap.org/img/wn/"+iconImg+".png";
iconTag.attr("src",iconurl);
var locationHeader=$("#current-weather");

    //Temp Wind and humidity display
    var div=$("<div>");
    var ul=$("<ul>");
    div.attr("class","relevantDetails");
    var currentdata=data.list[1]
    var currentTemp=currentdata.main.temp;
    currentTemp=(currentTemp-273.15).toFixed(2);
    //Tempreture in celcius
    var liTemp=$("<li>");
    liTemp=liTemp.text(`Temp: ${currentTemp} ℃ `);
    liTemp.append(iconTag);
    ul.append(liTemp);
    div.append(ul);
    locationHeader.append(div);
    //Wind in kph
    var currentWind=currentdata.wind.speed;
    currentWind=(currentWind*3.6).toFixed(2);
    var liWind=$("<li>");
   liWind.text(`Wind: ${currentWind} KPH`);
   ul.append(liWind);
    div.append(ul);
    locationHeader.append(div);
    
       //Humidity %
    var currentHumidity=currentdata.main.humidity;
    
    var liHumidity=$("<li>");
    liHumidity.text(`Humidity: ${currentHumidity} %`);
    ul.append(liHumidity);
    div.append(ul);
    locationHeader.append(div);
   
    
    //    Displaying 5 day weather for the location selected by the traveller
    $("#weather").empty();
   
    for(var i=0;i<=5; i++){
        //The api is sending 8 responses per day every 3 hour interval, below is ensuring those readings are skipped every 8 records.
        var weatherData=data.list[i*8];

        if (weatherData && weatherData.main) {
            
        var futureTemp= weatherData.main.temp;
        futureTemp=(futureTemp-273.15).toFixed(2);
        var futureWind=weatherData.wind.speed;
        futureWind=(futureWind*3.6).toFixed(2);
        var futureHumidity=weatherData.main.humidity;
        var dateTime=weatherData.dt_txt.split(' ');

        //Extracting icons for weather
        var iconTagData=$("<img>");
        var iconImgData= weatherData.weather[0].icon;
        var iconurlData="https://openweathermap.org/img/wn/"+iconImgData+".png";
        iconTagData.attr("src",iconurlData);

        
        //Creating card with weather details for each day
        var cardDiv=$("<div>").addClass("card");
        var dateTimeElement=$("<h5>").text(dateTime[0]);
        var tempElement=$("<p>").text(`Temp: ${futureTemp} ℃`);
        tempElement.append(iconTagData);
        var windElement=$("<p>").text(`Wind: ${futureWind} KPH`);
        var humidityElement=$("<p>").text(`Humidity: ${futureHumidity} %`);
        cardDiv.append(dateTimeElement,tempElement,humidityElement,windElement);

        $("#weather").append(cardDiv);
    } 
    }
}

//Creating a button everytime user searches city name
function createCityButton(cityname){
    var historySearch=document.querySelector("#history");
    var searchBtn=document.createElement("button");
    searchBtn.setAttribute("id","inputtext");
    searchBtn.setAttribute("class","btn btn-secondary");
    searchBtn.textContent=cityname;
    historySearch.appendChild(searchBtn);


}

//Clearing the screen when buttons from search history are clicked and calling the weather api to return weather details

$(document).on("click","#inputtext",function(event){
    event.preventDefault();
    $("#current-weather").empty();
    $("#weather").empty();
   
    var cityname=$(event.target).text();
   
    weatherAPICall(cityname);
    
    });


   


