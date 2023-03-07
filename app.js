const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('node:https');

app.use (bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    
   res.sendFile(__dirname+"/index.html")

})

app.post('/', (req, res) => {


    const query = req.body.cityName
    const apiKey ="e1c9c4de676ba236e55908a08343d50f";
    const unitMetric = "metric"
    const wheatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unitMetric;

    https.get(wheatherUrl, (response)=>{
    
        response.on('data', (data)=>{
        const weatherData = JSON.parse(data);
        
        const temperature = weatherData.main.temp;
        const weatherIcon = weatherData.weather[0].icon;
        const iconUrl ="https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

        res.write("<p>The wheather is currently "+weatherData.weather[0].description+"</p>");
        res.write("<h1>The temprature in London is "+temperature + " degrees celsius </h1>"); 
        res.write("<img src = "+iconUrl+">")
        res.send();
    });
    
})


})


app.listen(3000, ()=> {
    console.log("app is running on port 3000");
})