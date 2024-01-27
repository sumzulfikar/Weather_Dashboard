
$("#search-button").on("click",function(event){
    event.preventDefault();
var APIKey= "166a433c57516f51dfab1f7edaed8413";
var cityname=$("#search-input").val().trim();
console.log(cityname);

var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname + "&appid=" + APIKey;


fetch(queryURL)
.then(function(response){
return response.json();

})
.then(function(data){


    
    console.log(data);
});




})



