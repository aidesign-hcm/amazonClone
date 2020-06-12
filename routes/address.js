const express = require('express')
const router = express.Router();
const Address = require('../models/address')
const checkAuth =  require('../middlewares/verify-token')

router.post('/address', checkAuth, async (req,res) => {
    try {
        let address = new Address();
        address.user = req.decoded._id,
        address.country = req.body.country,
        address.streetAddress = req.body.streetAddress,
        address.city = req.body.city,
        address.state = req.body.state,
        address.zipcode = req.body.zipcode,
        address.phoneNumber = req.body.phoneNumber,
        address.deliverInstructions = req.body.deliverInstructions,
        address.securityCode = req.body.securityCode
        await address.save()
        res.status(200).json({
            status:true,
            message: 'address create successfully'
        })

    } catch (err) {
        console.log(err);
        res.status(404).json({
          error: err
        });
    }

    }
)

router.get("/address", checkAuth, async (req, res) => {
    try {
      let address = await Address.find({ user: req.decoded._id })
      res.status(200).json({
        success: true,
        address: address
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        error: err,
      });
    }
  });
module.exports = router 