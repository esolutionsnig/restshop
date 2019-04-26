const express = require('express')
const router = express.Router()

// Get orders
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders was fetched'
  })
})

// Create an order
router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Order was created'
  })
})

// Update an order
router.patch('/:orderId', (req, res, next) => {
  res.status(201).json({
    message: 'Order details',
    orderId: req.params.orderId
  })
})

// Delete an order
router.delete('/:orderId', (req, res, next) => {
  res.status(201).json({
    message: 'Order deleted',
    orderId: req.params.orderId
  })
})

module.exports = router