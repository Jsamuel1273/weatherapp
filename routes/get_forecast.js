const express = require('express');
const app = express()
// requiring ejs as template engine
const ejs = require("ejs");
// requring https for making request to api
const request = require('request');
// making ejs default view engine
app.set('view engine', 'ejs');
// requiring body-parser to access input from form
const bodyParser = require('body-parser');
// using body parser through express app
app.use(bodyParser.urlencoded({extended: true}));
// requiring dotenv to store api key
require('dotenv').config();
// using api key from dotenv file
api = process.env.API_KEY;

const getForecastRoute = new express.Router()

getForecastRoute.get("/forecast", (req, res)=>{
    // url with default query of longitued and latiitued for melbourne
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat=-37.840935&lon=144.946457&appid="+ api +"&units=metric"; 
    // making a request for
    request({url: url, json: true}, (error, response)=>{
        if(error){
            res.render("errors", {error: "There was an error reachng the server"})
        }else{
            if(response.statusCode == 404){
                        
                res.render("errors", {error: "City not found"})
            }else if(response.statusCode == 401){
                res.render("errors", {error: "There was an error connecting to api"})
            }
                const temperature = response.body.list
                const info = response.body
                res.render("forecast", {temperature: temperature, info: info,})
        }
    })
})

module.exports = getForecastRoute;