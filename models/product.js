const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAlgolia = require('mongoose-algolia')

const dotenv = require('dotenv')
dotenv.config()

const productSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    owner: {type: Schema.Types.ObjectId, ref: 'owner'},
    title: String,
    description: String,
    photo: String,
    price: Number,
    StockQuantity: Number,
    rating:[{type: Schema.Types.ObjectId, ref: 'Review'}],
})

productSchema.plugin(mongooseAlgolia, {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_SECRECKEY,
    indexName: 'amazon_Clone', //The name of the index in Algolia, you can also pass in a function
    selector: "title _id photo description price rating owner category", 

    populate: {
      path: 'owner',
      select: 'name',
    },
    debug: true, // Default: false -> If true operations are logged out in your console
  })
   
  
let Model = mongoose.model('Product', productSchema)
   
  Model.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings)
  Model.SetAlgoliaSettings({
    searchableAttributes: ['title'], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
  })

module.exports = Model