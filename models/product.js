const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    owner: {type: Schema.Types.ObjectId, ref: 'owner'},
    title: String,
    description: String,
    photo: String,
    price: Number,
    StockQuantity: Number,
    rating: [Number]
})

module.exports = mongoose.model('Product', productSchema)