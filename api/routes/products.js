const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const ProductControllers = require('../controllers/products')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Accept file
    cb(null, true)
  } else {
    // Reject a file
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

// const Product = require('../models/products')

// Get All Products
router.get('/', ProductControllers.get_all_products)

// Post new product
router.post('/', checkAuth, upload.single('productImage'), ProductControllers.create_new_product)

// Get Single product
router.get('/:productId', ProductControllers.get_single_product)

// Update Single product
router.patch('/:productId', checkAuth, ProductControllers.update_single_product)

// Delete Single product
router.delete('/:productId', checkAuth, ProductControllers.delete_single_product)

module.exports = router