const express = require('express');
const router = express.Router();
const moment = require('moment')

const SHIPMENT = {
    normal: {
        days: 7,
        price: 13.22
    },
    fast: {
        days:3,
        price: 24.45
    }
};

function shipmentPrice(shipmentOption){
    let estimated = moment().locale('vi').add(shipmentOption.days, "d").format('dddd, Do, MMMM');
    return {estimated, price: shipmentOption.price}
}

router.post('/shipment', (req, res) =>{
    let shipment;
    if(req.body.shipment === "normal"){
        shipment = shipmentPrice(SHIPMENT.normal)
    } else {
        shipment = shipmentPrice(SHIPMENT.fast)
    }
    res.json({
        success: true,
        shipment: shipment
    })
})

module.exports = router 
