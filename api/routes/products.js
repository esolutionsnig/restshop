const express = require('express')
const router = express.Router()

// Get All Products
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  })
})

// Post new product
router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST request to /products'
  })
})

// Get Single product
router.get('/:productId', (req, res, next) => {
  // Extract product object
  const id = req.params.productId
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
    })
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    })
  }
})

// Update Single product
router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product'
  })
})

// Delete Single product
router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product'
  })
})

module.exports = router