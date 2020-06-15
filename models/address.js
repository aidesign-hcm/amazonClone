const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    fullName: String,
    country: String,
    streetAddress: String,
    city: String,
    state: String,
    zipcode: Number,
    phoneNumber: Number,
    deliverInstructions: String,
    securityCode: String
})

module.exports = mongoose.model('Address', addressSchema)