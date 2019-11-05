const express = require('express')
const app = express()
const mongoose = require('./config/database')
const router = require('./config/routes')
const port = 3020
const cors = require('cors')

app.use(cors())

app.use(express.json())


app.get('/',(req, res) => {
    res.json({
        notice: 'Welcome to note taking app'
    })
})

app.use('/',router)

// app.use(function(req,res){
//     res.send('incorrect url')
// })

app.listen(port,() => {
    console.log('listening on port',port)
})