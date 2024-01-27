
$("#search-button").on("click",function(event){
    event.preventDefault();
var APIKey= "166a433c57516f51dfab1f7edaed8413";
var cityname=$("#search-input").val().trim();
console.log(cityname);

var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname + "&appid=" + APIKey;
//Date format expected 14/9/2022
var currentdate=dayjs().format("DD/M/YYYY");
var cloud=$("<i>");
cloud.attr("class","fa-solid fa-cloud");

var h1=$("<h1>");
h1.text(`${cityname} (${currentdate})`);
var locationHeader=$("#today").append(h1.append(cloud));


fetch(queryURL)
.then(function(response){
return response.json();

})
.then(function(data){
   
   
    console.log(currentdate);
    
    //Temp Wind and humidity display
    var div=$("<div>");
    var ul=$("<ul>");
    div.attr("class","relevantDetails");
    var currentTemp=data.list[0].main.temp;
    currentTemp=(currentTemp-273.15).toFixed(2);
    //Tempreture in celcius
    var liTemp=$("<li>");
    liTemp=liTemp.text(`Temp: ${currentTemp} ℃`);
    ul.append(liTemp);
    div.append(ul);
       locationHeader.append(div);
    //Wind in kph
    var currentWind=data.list[0].wind.speed;
    currentWind=(currentWind*3.6).toFixed(2);
    var liWind=$("<li>");
   liWind.text(`Wind: ${currentWind} KPH`);
   ul.append(liWind);
    div.append(ul);
       locationHeader.append(div);
    
       //Humidity %
    var currentHumidity=data.list[0].main.humidity;
    
    var liHumidity=$("<li>");
    liHumidity.text(`Humidity: ${currentHumidity} %`);
    ul.append(liHumidity);
    div.append(ul);
       locationHeader.append(div);
    
    });
    
    
    
});








