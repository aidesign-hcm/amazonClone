const express = require('express')
const router = express.Router();
const Product = require('../models/product')
const upload = require('../middlewares/uploads-photo')

router.post('/products', upload.single("photo"), async(req,res) => {
    try {
        let product = new Product();
        product.title = req.body.title; 
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.StockQuantity = req.body.StockQuantity
        await product.save()
        res.status(200).json({
            status:true,
            message: 'Product create successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err
        });
    }
})

module.exports = router 