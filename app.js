const express = require('express')
const app = express()
const morgan = require('morgan')

// Set up morgan to log files activites
app.use(morgan('dev'))

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// Routes which should handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

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