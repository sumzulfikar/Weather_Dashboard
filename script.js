
$("#search-button").on("click",function(event){
    event.preventDefault();
var APIKey= "166a433c57516f51dfab1f7edaed8413";
var cityname=$("#search-input").val().trim();
//Date format expected 14/9/2022
var currentdate=dayjs().format("DD/M/YYYY");
var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname + "&appid=" + APIKey;



fetch(queryURL)
.then(function(response){
return response.json();

})
.then(function(data){
    console.log(data);
var cloud=$("<i>");
cloud.attr("class","fa-solid fa-cloud");

var h1=$("<h1>");
h1.text(`${cityname} (${currentdate})`);

var locationHeader=$("#today").append(h1.append(cloud));

//Temp Wind and humidity display
var div=$("<div>");
var ul=$("<ul>");
div.attr("class","relevantDetails");
var currentTemp=data.list[0].main.temp;
currentTemp=(currentTemp-273.15).toFixed(2);
//Tempreture in celcius
var liTemp=$("<li>");
liTemp=liTemp.text(`Temp: ${currentTemp} ℃`);
ul=ul.append(liTemp);
div=div.append(ul);
   locationHeader.append(div);
//Wind in kph
var currentWind=data.list[0].wind.speed;
currentWind=(currentWind*3.6).toFixed(2);
var liWeather=$("<li>");
liWeather=liWeather.text(`Wind: ${currentWind} KPH`);
ul=ul.append(liWeather);
div=div.append(ul);
   locationHeader.append(div);

   //Humidity %
var currentWind=data.list[0].wind.speed;
currentWind=(currentWind*3.6).toFixed(2);
var liWeather=$("<li>");
liWeather=liWeather.text(`Wind: ${currentWind} KPH`);
ul=ul.append(liWeather);
div=div.append(ul);
   locationHeader.append(div);
  
});




})



