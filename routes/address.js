const express = require("express");
const router = express.Router();
const Address = require("../models/address");
const checkAuth = require("../middlewares/verify-token");
const axios = require("axios");
const User = require('../models/user')

// dang ki dia chi moi

router.post("/address", checkAuth, async (req, res) => {
  try {
    let address = new Address();
      (address.user = req.decoded._id),
      (address.fullName = req.body.fullName),
      (address.country = req.body.country),
      (address.streetAddress = req.body.streetAddress),
      (address.city = req.body.city),
      (address.state = req.body.state),
      (address.zipcode = req.body.zipcode),
      (address.phoneNumber = req.body.phoneNumber),
      (address.deliverInstructions = req.body.deliverInstructions),
      (address.securityCode = req.body.securityCode);
    await address.save();
    res.status(200).json({
      success: true,
      message: "address create successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
});

// Lay dia chi cua thanh vien

router.get("/address", checkAuth, async (req, res) => {
  try {
    let address = await Address.find({ user: req.decoded._id,  });

    res.status(200).json({
      success: true,
      address: address,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
});

// Lay ten cac nuoc tren the gioi 

router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all");
    res.json(response.data);
  } catch (err) {
      res.status(500).json({
      message: err.message,
      success:false
    });
  }
});

// Lấy thông tin địa chỉ
router.get("/address/:id", checkAuth, async (req, res) => {
  try{
    let foundAddress = await Address.findOne({_id : req.params.id})
      res.status(200).json({
        success: true,
        address: foundAddress
    })
  } catch(err){
      res.status(500).json({
      message: err.message,
      success:false
    });
  }
})

// Chinh sua dia chi

router.put("/address/:id", checkAuth, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({ _id: req.params.id, user: req.decoded._id });
    if (foundAddress) {
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.streetAddress)
        foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.zipcode) foundAddress.zipcode = req.body.zipcode;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliverInstructions)
        foundAddress.deliverInstructions = req.body.deliverInstructions;
      if (req.body.securityCode)
        foundAddress.securityCode = req.body.securityCode;
    }
    await foundAddress.save();
    res.status(200).json({
      success: true,
      message: "Successfully updated the address",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Xoa dia chi User

router.delete("/address/:id", checkAuth, async (req, res) => {
  try {
    let deleteAddress = await Address.remove({
      user: req.decoded._id, 
      _id: req.params.id})
    if (deleteAddress){
      res.status(200).json({
        success: true,
        message: "Address has been delete"
      })
    }
  } catch (err){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Set dia chi mac dinh

router.put("/address/set/default", checkAuth, async (req, res) => {
  try {
    const updatedAddressUser = await User.findOneAndUpdate(
      {_id: req.decoded._id}, 
      {$set: {address: req.body.id}})
    if(updatedAddressUser){
      res.status(200).json({
        success: true,
        message: "Address has been set default"
      })
    }
  } catch(err){
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

module.exports = router;
