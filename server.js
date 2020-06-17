const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')

const User = require('./models/user')

const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owner')
const authRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review')
const addressRoutes = require('./routes/address')
const paymentRoutes = require('./routes/payment')
const orderRoutes = require('./routes/order')

dotenv.config()
var app = express()

// Kết nối với Database
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DATABASE,
{ useNewUrlParser: true, useUnifiedTopology: true},
err => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to database')
    }
})
mongoose.Promise = global.Promise;


// CROS Cross-origin resource sharing
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     if (req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//       return res.status(200).json({});
//       }
//     next();
// });


// Middelware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.json('Hello Amazon clone App')
})
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)
app.use('/api', authRoutes)
app.use('/api', reviewRoutes)
app.use('/api', addressRoutes)
app.use('/api', paymentRoutes)
app.use('/api', orderRoutes)


app.listen(8000, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Hello world')
    }
    
})