const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    owner:  {type: Schema.Types.ObjectId, ref: 'User'},
    products: [
        {
            productId: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
            price: Number

        }
    ],
    estimated: String
})

orderSchema.plugin(deepPopulate);

module.exports = mongoose.model('Order', orderSchema)