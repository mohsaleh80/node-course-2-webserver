/**
 * Created by Mohammad on 1/8/2017.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// set port in enviroment variables
const port = process.env.PORT || 3000;

var app = express();

//setting view engine
app.set('view engine','hbs');

//declaring Partials
hbs.registerPartials(__dirname+'/views/partials');

//declaring helpers
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('capitalizeIt',(text)=>{
    return text.toUpperCase();
});

//static web pages - Middleware

app.use((req,res,next)=>{

    var now = new Date().toString();
    var logMessage = `${now} : ${req.method} ${req.originalUrl} `+'\n';

    console.log(logMessage);

    fs.appendFile('log-server.log', logMessage, (err) => {
        if (err) {
            console.log('The data to append was not appended to file!');
        }
    });
    next();

});
/*
app.use((req,res,next)=>{
    res.render('maintenance.hbs');

});
*/
app.use(express.static(__dirname + '/public'));



//Routes
/*
app.get('/',(req,res)=>{
    //res.send('Hello World');
    res.send({
        name: 'Mohammad',
        hobbies: ['Cinema','Fucking','Programing']
    });
});
*/
// dynamic using view engine
app.get('/',(req,res)=>{

      res.render('home.hbs',{
          pageTitle:'This is home page...',
          welcomePara:'Welcome to Home Page!',
          message : 'this text use helper to capitalize.'
      });
});

// dynamic using view engine
app.get('/about',(req,res)=>{
   // res.send('About Page!');
      res.render('about.hbs',{
          pageTitle:'About Page ...'
      });
});

// dynamic using view engine
app.get('/projects',(req,res)=>{
    // res.send('About Page!');
    res.render('projects.hbs',{
        pageTitle:'Potfolio Page ...',
        message : 'here is our portfolio of projects.'
    });
});

app.get('/bad',(req,res)=>{

    res.send({
        statusCode: 404,
        Message: 'request Failed'
    });
});

app.listen(port, ()=>{
    console.log(`server is up on port: ${port}`);
});