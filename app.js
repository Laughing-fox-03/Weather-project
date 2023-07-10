const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));

const https = require("https");


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

    const qwery = req.body.cityName;
    const apiKey = "ecff3c9a85d4fa476db3ef94e5478839";
    const temparatureUnit = "metric";

    const externalUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + qwery + "&units=" + temparatureUnit+ "&appid=" + apiKey;
    https.get(externalUrl , function(response){
        response.on("data", function(data){
            var weatherData = JSON.parse(data);
            var tempearature = weatherData.main.temp;
            var weatherDescription  = weatherData.weather[0].description;
            var weatherIcon = weatherData.weather[0].icon;

            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1> Temperature is " + tempearature + " Celcius.</h1>");
            res.write("<img src = https://openweathermap.org/img/wn/"+ weatherIcon + "@2x.png >");
            res.send();

        });
    });

    
}); 





app.listen(3000, function(){
    console.log("server is running on port 3000");
});