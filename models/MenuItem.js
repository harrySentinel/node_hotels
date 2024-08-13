const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    taste:{
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
        required: true
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const MenuItem = mongoose.model('MenuItem',menuItemSchema);

module.exports = MenuItem;