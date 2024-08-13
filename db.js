const mongoose = require('mongoose');
require('dotenv').config();

// define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL
//   const mongoURL = process.env.MONGODB_URL

// set up MongoDB connection

mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    
})

// get the default connection
// Mongoose maintains a default connection object representing the mongodb connection.
const db = mongoose.connection;

// define event listeners for database connection

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', (err) => {
     console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// export the database connection
module.exports = db;