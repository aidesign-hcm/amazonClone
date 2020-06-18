const express = require("express");
const router = express.Router();
const algoliasearch = require("algoliasearch");

const dotenv = require('dotenv')
dotenv.config()

const client = algoliasearch(
    process.env.ALGOLIA_APP_ID, 
    process.env.ALGOLIA_SECRECKEY
    );
const index = client.initIndex(process.env.ALGOLIA_INDEX);

router.post('/search', async (req,res) => {
    try {
        let result = await index.search(req.body.title)
        res.json(result.hits)
    } catch(err){
        res.json(err.message)
    }
})

module.exports = router;