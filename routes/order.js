const express = require('express')
const router = express.Router();
const Order = require('../models/order');
const verifyToken = require('../middlewares/verify-token');

router.get('/orders', verifyToken, async (req,res) => {
    try {
        let products = await Order.find({ owner: req.decoded._id })
        .deepPopulate("owner products.productId.owner")
        .exec();
        res.json({
            success: true,
            products: products
        });
    } catch(err){
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router 