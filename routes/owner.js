const express = require('express')
const router = express.Router();
const Owner = require('../models/owner')
const upload = require('../middlewares/uploads-photo')

router.post('/owners', upload.single("photo"), async (req,res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name; 
        owner.about = req.body.about; 
        owner.photo = req.file.location; 
        await owner.save()
        res.status(200).json({
            status:true,
            message: 'Owner create successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err
        });
    }
})

router.get('/owners', async (req,res) => {
    try {
        let owners = await Owner.find()
        res.status(200).json({
            status:true,
            owners: owners
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
          error: err
        });
    }
})

module.exports = router 