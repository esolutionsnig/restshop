const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Import Routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

// Connect to DB
mongoose.connect('mongodb+srv://etech:' + process.env.MONGO_ATLAS_PW +'@cluster0-wkkqz.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
// Use default node js promise implementation
mongoose.Promise = global.Promise

// Set up morgan to log files activites
app.use(morgan('dev'))
// Middleware to enable folder to be publicly available
app.use('/uploads', express.static('uploads'))
// Use body parser to format what is sent as feedback from api
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Set up Cross Origin Resource Sharing CORS and Handle CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

// Handle Error Request that are not part of the defined routes
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error);
})

// Handle any kind of errors thrown in this application DB etc.
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;