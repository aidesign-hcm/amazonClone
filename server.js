const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

var app = express()

app.use(morgan('dev'))
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Hello Amazon clone App')
})

app.post('/', (req, res) => {
    console.log(req.body.name)
})

app.listen(3000, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Hello world')
    }
    
})