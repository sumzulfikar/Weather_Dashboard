
$("#search-button").on("click",function(event){
    event.preventDefault();
var APIKey= "166a433c57516f51dfab1f7edaed8413";
var cityname=$("#search-input").val().trim();
//Creating a button everytime user searches city name
var historySearch=document.querySelector("#history");
var searchBtn=document.createElement("button");
searchBtn.setAttribute("id","inputtext");
searchBtn.setAttribute("class","btn btn-secondary");
searchBtn.textContent=cityname;
historySearch.appendChild(searchBtn);

var savecityname=localStorage.setItem("cityname",cityname);
console.log(savecityname);





console.log(cityname);

var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname + "&appid=" + APIKey;
//Date format expected 14/9/2022 "&cnt=15"+
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
   console.log(data);

    //Temp Wind and humidity display
    var div=$("<div>");
    var ul=$("<ul>");
    div.attr("class","relevantDetails");
    var currentdata=data.list[1]
    var currentTemp=currentdata.main.temp;
    currentTemp=(currentTemp-273.15).toFixed(2);
    //Tempreture in celcius
    var liTemp=$("<li>");
    liTemp=liTemp.text(`Temp: ${currentTemp} ℃`);
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
    var weather=document.querySelector(".weather")
    for(var i=0;i<=5; i++){
        var div=$("<div>").attr("class","card");
        var weekday=$("<h5>");
        weekday.text(data.list[i].dt_txt);
        var liTemp=$("<li>");
        var liWind=$("<li>");
        var liHumidity=$("<li>");
       //weather.append(liTemp).append(liWind).append(liHumidity);
    }



    });
    
    
}); 









