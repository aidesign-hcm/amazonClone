const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    name: {type: String, unique: true, required: true },
    about: {type: String, unique: true, required: true },
    photo: {type: String, unique: true,},
})

module.exports = mongoose.model('owner', ownerSchema)