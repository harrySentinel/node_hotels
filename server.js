const express = require('express')
const app = express();
const db = require('./db');

// bodyParser is a middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


app.get('/', function (req, res) {
  res.send('welcome to our server !!')
})



// import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



app.listen(3000 ,()=>{
    console.log('server is listening')
})