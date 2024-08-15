const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


// bodyParser is a middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();  // move on to next phase // it's a callback function which signals to express
}

app.use(logRequest); // this line tells express to use this middleware for all routes

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', function (req, res){
     res.send('Welcome to our Hotel');
})

// import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



app.listen(PORT ,()=>{
    console.log('listening on port 3000');
})