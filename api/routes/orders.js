const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders') 

router.get('/', checkAuth, OrdersController.orders_get_all)

// Create an order
router.post('/', checkAuth, OrdersController.create_order)

// Get Single Order
router.get('/:orderId', checkAuth, OrdersController.orders_get_single)

// Delete an order
router.delete('/:orderId', checkAuth, OrdersController.delete_order)

module.exports = router