const express = require('express')
const router = express.Router();
const Category = require('../models/category')

router.post('/categories', async (req,res) => {
    try {
        let category = new Category();
        category.type = req.body.type; 
        await category.save()
        res.status(200).json({
            status:true,
            message: 'Category create successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err
        });
    }
})

router.get('/categories', async (req,res) => {
    try {
        let categories = await Category.find()
        res.status(200).json({
            status:true,
            categories: categories
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
          error: err
        });
    }
})

module.exports = router 