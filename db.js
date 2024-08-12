const mongoose = require('mongoose');

// define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

// set up MongoDB connection

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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