const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const User = require('./models/user')

const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owner')

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
mongoose.Promise = global.Promise;

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Hello Amazon clone App')
})
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)


app.listen(3000, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Hello world')
    }
    
})