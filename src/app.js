const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Gourav Basera'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Gourav Basera'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'Help',
        title: "Help",
        name: 'Gourav Basera'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: "Please provide a valid address"
        })
    } geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send(error)
        }
    
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send(error)
            }
    
            res.send({
                location,
                forecastData
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Gourav basera',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: "404",
        name: "Gourav Basera",
        errorMessage: "Page Not found"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})