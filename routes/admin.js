// admin.js - The admin routes

const path = require('path');

const express = require('express');
const router = express.Router(); // mini express app that can be exported

const adminController = require('../controllers/admin');

// router allows exporting routes

router.get('/add-product', adminController.getAddProduct); 
router.get('/products', adminController.getProducts); 
router.get('/edit-product/:productId', adminController.getEditProduct); 

router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
