
$("#search-button").on("click",function(event){
    event.preventDefault();
var APIKey= "166a433c57516f51dfab1f7edaed8413";
var cityname=$("#search-input").val().trim();
//calling the create city button function



//Creating a button everytime user searches city name

var historySearch=document.querySelector("#history");
var searchBtn=document.createElement("button");
searchBtn.setAttribute("id","inputtext");
searchBtn.setAttribute("class","btn btn-secondary");
searchBtn.textContent=cityname;
historySearch.appendChild(searchBtn);


//Saving city name in local storage
var cityValue=localStorage.getItem("cities")
var savedCities=JSON.parse(cityValue);
if (savedCities === null) {
    savedCities = [];
  }
savedCities.push(cityname);

localStorage.setItem("cities",JSON.stringify(savedCities));


var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname + "&appid=" + APIKey;
//Date format expected 14/9/2022 "&cnt=15"+
var currentdate=dayjs().format("DD/M/YYYY");


var h1=$("<h1>");
h1.text(`${cityname} (${currentdate})`);
var locationHeader=$("#today").append(h1);


fetch(queryURL)
.then(function(response){
return response.json();

})
.then(function(data){

// Displaying correct icon from API
var iconTag=$("<img>");
var iconImg= data.list[1].weather[0].icon;
var iconurl="https://openweathermap.org/img/wn/"+iconImg+".png";
iconTag.attr("src",iconurl);

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
    console.log(currentdata.dt_txt);
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

    });
    
    
}); 


//Clearing the screen when buttons from search history are clicked

 $(document).on("click","#inputtext",displayHistoricalCities);

function displayHistoricalCities(event){
    event.preventDefault();
$("#weather").empty();
$("#current-weather").empty();

}












