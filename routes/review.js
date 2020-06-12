const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const upload = require("../middlewares/uploads-photo");
const checkAuth =  require('../middlewares/verify-token')

// Đánh giá sản phẩm
router.post("/reviews/:productId",[checkAuth, upload.single("photo")], async (req, res) => {
    try {
      let review = new Review();
      review.headline = req.body.headline;
      review.body = req.body.body;
      review.rating= req.body.rating;
      review.productId = req.params.productId,
      review.user = req.decoded._id
    
      await Product.update({$push: review._id})
      const saveReview = await review.save();
      if(saveReview){res.status(200).json({
        status: true,
        message: "Review Done",
      })}
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
});

router.get("/reviews/:productId", async (req, res) => {
    try{
        const productReviews = await Review.find({
            productId : req.params.productId
        })
        .populate('user')
        .exec();
        res.json({
            success: true,
            reviews: productReviews
        })

    } catch(err){
        console.log(err);
        res.status(404).json({
        error: err,
        message: "something wrong"
      });
    }
}
)
module.exports = router;
