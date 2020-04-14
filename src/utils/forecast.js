const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude +'&units=metric&appid=1a7e621728f256677a12c53d5af0bbc0'
    request({url,json :true},(error,{body}={})=>{
       // console.log(response)
        if(error) {
            callback('Unable to connect to forecast services!',undefined)
        } else if (body.cod ==400){
            callback('Unable to find location',undefined)
        } else {
            
            callback(undefined,{
                temp: body.current.temp,
                description: body.current.weather[0].description

            })
        }
    })
}

module.exports = forecast