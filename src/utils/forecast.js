const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33cf03d8196f411abd58b0e6bf3c7f35&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to the server', undefined)
        } else if (response.body.error) {
            callback('Location not found', undefined)
        } else {
            callback(undefined, `Observation Time: ${response.body.current.observation_time}, ${response.body.current.weather_descriptions}, It is currently ${response.body.current.temperature} degrees out. But feels like ${response.body.current.feelslike}. There is ${response.body.current.precip}% chance of rain`)
        }
    })
}


module.exports = forecast