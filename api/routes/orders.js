const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')

const Order = require('../models/orders')
const Product = require('../models/products')

/**
 * Handle incoming GET request to /orders
 * The populate method allows you fetch data from a foreign table
 * It takes a second parameter of columns u want to return
*/

router.get('/', checkAuth, (req, res, next) => {
  Order.find()
  .select('product quantity _id')
  .populate('product', 'name')
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      orders: docs.map(doc => {
        return {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: 'GET',
            url: 'https//localhost:3000/orders/' + doc._id
          }
        }
      })
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})

// Create an order
router.post('/', checkAuth, (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      // check if product is found
      if(!product) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })
      return order
        .save()
        
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id: result.product,
          quantity: result.quantity
        },
        request: {
          type: 'GET',
          url: 'https//localhost:3000/orders/' + result._id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

// Get Single Order
router.get('/:orderId', checkAuth, (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'https//localhost:3000/orders/'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

// Delete an order
router.delete('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId
  Order.remove({_id: id})
    .exec()
    .then(order => {
      // Check if order exists
      if (!order) {
        return res.status(404).json({
          message: 'Order not found'
        })
      }
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          description: 'CREATE_NEW_ORDER',
          url: 'http://localhost:3000/orders/',
          body: { productId: 'ID', quantity: 'Number' }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router