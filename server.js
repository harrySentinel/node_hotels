const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

// bodyParser is a middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('welcome to our server !!')
})

app.get('/', function (req, res){
  res.send('abe bhai chal to rha hai, wo bhi smoothly')
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