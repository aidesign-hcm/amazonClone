const express = require('express')
const router = express.Router();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth =  require('../middlewares/verify-token')
const User =  require('../models/user')

router.post('/auth/signup', (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  const token = jwt.sign({ user }, process.env.SECRETJSON)
                  res.status(201).json({
                    success:true,
                    message: "User created",
                    token,
                    email: user.email,
                    name: user.name
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  }
)

router.get('/auth/user', checkAuth, async (req, res, next) => {
    try {
        let foundUser = await User.findOne({_id: req.decoded._id })
        .populate('address')
        if(foundUser) {
            res.json({
                success: true,
                user: foundUser
            })
        }

    } catch(err) {
        console.log(err),
            res.status(500).json({ error: err })
    }
})

// Update Profile 
router.put('/auth/user', checkAuth, async (req, res, next) => {
  try {
      let foundUser = await User.findOne({email: req.decoded.email })
      if(foundUser) {
          if(req.body.name) foundUser.name = req.body.name;
          if(req.body.email) foundUser.mail = req.body.mail;
          if(req.body.password) foundUser.password = req.body.password
          await foundUser.save()
          res.status(200).json({
            success: true,
            message: "Update Profile Successfully"
          })
      }

  } catch(err) {
      console.log(err),
          res.status(500).json({ error: err })
  }
})


// router.post('/auth/login', (req, res, next) => {
//     User.find({ email: req.body.email })
//       .exec()
//       .then(user => {
//         if (user.length < 1) {
//           return res.status(401).json({
//             message: "wrong Email"
//           });
//         }
//         bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//           if (err) {
//             return res.status(401).json({
//               message: "Wrong Pass"
//             });
//           }
//           if (result) {
//             const token = jwt.sign(
//               {
//                 email: user[0].email,
//                 userId: user[0]._id
//               },
//               process.env.SECRETJSON,
//               {
//                 expiresIn: "1h"
//               }
//             );
//             return res.status(200).json({
//               message: "Auth successful",
//               token: "Bearer" + token
//             });
//           }
//           res.status(401).json({
//             message: "Auth failed"
//           });
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   }
// )
router.post('/auth/login', async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser){
          res.status(403).json({
            success: false,
            message: "authentication faled, USer doesn't exits"
          })
        } else {
          
          if(foundUser.comparePassword(req.body.password)) {
            let token = jwt.sign(foundUser.toJSON(), process.env.SECRETJSON, {
            expiresIn: "4h"} )
            res.json({ 
              success: true, 
              token: token, 
              email: foundUser.email,
              name: foundUser.name
            })
        } else {
            res.status(403).json({
              success: false,
              message: "authentication faled, wrong Password"
            })
        }
      }
    } catch(err) {
      console.log(err),
      res.status(500).json({ error: err })
  }
 })

module.exports = router