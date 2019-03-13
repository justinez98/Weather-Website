const path = require('path')
const express = require('express')
const hbs = require('hbs')// setting up partial(partial part of html like header and footer that are gonna be reuse)
const request = require('request');
const geocode = require('./geocode')

const app = express()
// using process.env is to check the enviroment of the heroku
//set up the port for heroku as heroku have their own port number
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname,'..','./public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebards engine and views location
app.set('view engine','hbs')//get handlebar set up with express important to get the name right, create a foler call views and proceed with hbs instead of html
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Justine'
    })  
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Justine'
    })  
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Justine',
        helpText: 'This is help page'
    })  
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You Must provide a location address'
        })
    }
    geocode.geocodeAddress(req.query.address,(errorMessage,results)=>{
        if(errorMessage){
            return res.send({errorMessage})
        }else{
            geocode.geocodeWeather(results,(errorMessage1,finalresults)=>{
                if(errorMessage1){
                    return res.send({errorMessage1})
                }else{
                    res.send({
                        address: req.query.address,
                        forecast: `The Temperature are now :${finalresults.temperature} Farenheit.${finalresults.current_weather}.${finalresults.summary}`,
                        location: results.address
                    })
                }
            })

        }
    })

    
})
app.get('/products',(req,res)=>{
    //use ? on the web to do a query which will be store in the req.query here
    //cannot respond twice hence need to use the return to stop anything from working after the return
    if(!req.query.search){
        return res.send({
            error: 'You Must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Justine',
        errorMessage: 'Help Article Not Found'
    })  
})
//* WILD CARD MATCH ANYTHING 
//must be last(THIS MUST BE LAST MATCH)
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Justine',
        errorMessage: 'Page Not Found'
    })  
})

//go to localhost:3000 for local
app.listen(port,() => {
    console.log('Server is up on port '+ port)
})