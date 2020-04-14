const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')



//Define paths for Express config
const staticFilePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup static directory to serve
app.use(express.static(staticFilePath))

//Set handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Tulsi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Tulsi',
        description: 'This is some helpful text'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page!',
        name:'Tulsi'
    })
})
// app.get('/help',(req,res)=>{
//     res.send('<h1>Hello! How can I help you? </h1>')
// })

// app.get('/about',(req,res)=>{
//     res.send('<title>About Page!</title>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            Error: 'Provide an address for weather information!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
            return res.send({
                Error: error
            })
        }
        forecast(latitude,longitude , (error, forecastData) => {
            if (error) {
               return  res.send({
                    Error: error
                })
            } 
            res.send({
                temperature: forecastData.temp,
                description: forecastData.description,
                address: location
            })
          })
    })
})



app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : '404',
        name: 'Tulsi',
        errorMessage :'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title : '404',
        errorMessage: 'Page Not Found',
        name :'Tulsi'
    })
})
app.listen(3000,()=>{
    console.log('App is up at port 3000')
})