const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {type: String, required: true},
    email : {type: String, unique: true, required: true },
    password: {type: String, required: true},
    address: {type: Schema.Types.ObjectId, ref: 'address'}
})

module.exports = mongoose.model('User', userSchema)