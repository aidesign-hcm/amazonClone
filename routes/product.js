const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const upload = require("../middlewares/uploads-photo");
var multer = require("multer");

// Đăng sản phẩm lên Mongo
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    // product.photo = req.file.location;
    product.price = req.body.price;
    product.StockQuantity = req.body.StockQuantity;
    await product.save();
    res.status(200).json({
      status: true,
      message: "Product create successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Get sản phẩm về dạng json

router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({
      status: true,
      count: products.length,
      products: products.map((product) => {
        return {
          title: product.title,
          price: product.price,
          productImage: product.photo,
          description: product.description,
          StockQuantity: product.StockQuantity,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/products/" + product._id,
          },
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
});

// Get chi tiết 1sản phẩm về dạng json

router.get("/products/:id", async (req, res) => {
  try {
    let products = await Product.find({ _id: req.params.id });
    res.status(200).json({
      products: products.map((product) => {
        return {
          title: product.title,
          price: product.price,
          productImage: product.photo,
          description: product.description,
          StockQuantity: product.StockQuantity,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/products/" + product._id,
          },
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
});

/// Chinh sua san pham

router.put("/products/:id", (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Product updated",
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
)
// [
// 	{
// 	"propName" : "title", "value": "new cocacola"
// 	}
// ]

router.delete("/products/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        await Product.remove({ _id: id });
        res.status(200).json({
            message: "Product deleted",
        });
    } catch {
        console.log(err);
        res.status(500).json({
          error: err
        });
    }
  }
)
module.exports = router;
