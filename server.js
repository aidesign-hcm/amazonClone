const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const User = require('./models/user')

const productRoutes = require('./routes/product')

dotenv.config()
var app = express()

// Kết nối với Database
mongoose.connect(process.env.DATABASE,
{ useNewUrlParser: true, useUnifiedTopology: true },
err => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to database')
    }
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.json('Hello Amazon clone App')
})
app.use('/api', productRoutes)

// app.post('/', (req, res) => {
//     let user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.save(err => {
//         if (err) {
//             res.json(err)
//         } else {
//             res.json('User create Sucssefuly')
//         }
//     })
// })

app.listen(3000, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Hello world')
    }
    
})