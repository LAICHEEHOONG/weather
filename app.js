// const express = require('express');
// const app = express();
// const port = 3000;
// const https = require('https');
// const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.sendFile(`${__dirname}/index.html`);
// })

// app.post('/', (req, res) => {

// const query = `${req.body.cityName}`;
// const apiKey = 'c913e798cfbbe1762d3dec3826d93113';
// const unit = 'metric';
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
// //https://api.openweathermap.org/data/2.5/weather?q=London&appid=c913e798cfbbe1762d3dec3826d93113&units=metric

// https.get(url, (response) => {
    
//     // console.log(response);

//     console.log(response.statusCode);
    
//     response.on('data', (data) => {
//         const weatherData = JSON.parse(data);
//         const temp = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;
//         const icon =  weatherData.weather[0].icon;
//         const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
//         res.write(`<p>The weather is currently ${weatherDescription}</p>`);
//         res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`);
//         res.write(`<img src=${imageUrl}>`);
//         res.send();
//     })  
// });

    
// })



// app.listen(3000, () => console.log(`Server is running on port ${port}.`));

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post('/weather', (req, res) => {
    const city = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c913e798cfbbe1762d3dec3826d93113&units=metric`;

    https.get(url, (response) => {

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            console.log(response.statusCode + ', ' + response.statusMessage);
            

            res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
              <style>
                body {
                    margin: 0 auto;
                    width: 600px;
                    font-size: 2.5rem;
                }
                img {
                    margin-top: 15%;
                    width: 33%;
                    
                }
              </style>
              
              <title>City Weather Data</title>
            </head>
            <body>
            
            
            
            <img src=http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png
            <br>
            <div class="name">${weatherData.name}</div>
            <div>Temparature Min: ${weatherData.main.temp_min} &#8451</div>
            <div>Temparature Max: ${weatherData.main.temp_max} &#8451</div>
            <a href="http://localhost:3000/"><button type="button" class="btn btn-primary">Home Page</button></a>
            
            
            
            
            </body>
            </html>




            `)
            
            
            
     

            
    
            res.send();
        })
      
       
    })

    
})

app.listen(3000, () => console.log(`Port: ${port} Running`));




// <img src=http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png
// <div>${weatherData.name}</div>

// <div>temparature min: ${weatherData.main.temp_min} &#8451</div>
// <div>temparature min: ${weatherData.main.temp_max} &#8451</div>
// <a href="http://localhost:3000/"><button class="btn">Back</button></a>