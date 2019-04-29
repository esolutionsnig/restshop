const mongoose = require('mongoose')
const Order = require('../models/orders')
const Product = require('../models/orders')

// Get All Orders
exports.orders_get_all = (req, res, next) => {
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
}

// Create Order
exports.create_order = (req, res, next) => {
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
}

// Get Single Order
exports.orders_get_single = (req, res, next) => {
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
}

// Delete Single Order
exports.delete_order = (req, res, next) => {
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
}