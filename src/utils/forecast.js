const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33cf03d8196f411abd58b0e6bf3c7f35&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to the server', undefined)
        } else if (response.body.error) {
            callback('Location not found', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out at " + response.body.current.observation_time)
        }
    })
}


module.exports = forecast