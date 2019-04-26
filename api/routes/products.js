const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/products')

// Get All Products
router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      console.log(docs)
      if (docs.length >= 0) {
        res.status(200).json(docs)
      } else {
        res.status(404).json({
          message: 'No entries found'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'No valid entry found for provided ID'
      })
    })
})

// Post new product
router.post('/', (req, res, next) => {
  // Get product Object
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })

  // Save Product to DB
  product
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
    message: 'Handling POST request to /products',
    createdProduct: product
  })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
})

// Get Single product
router.get('/:productId', (req, res, next) => {
  // Extract product object
  const id = req.params.productId
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc)
      res.status(200).json(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({
        message: 'No valid entry found for provided ID'
      })
    })
})

// Update Single product
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  const updateOps = {}
  // Loop through the request body and get fields that needs to be updated
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Product.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

// Delete Single product
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router