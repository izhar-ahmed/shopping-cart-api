const express = require('express')
const connectDB = require('./config/db')
const routes = require('./routes')


const app = express()

connectDB()


app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello world")
})

app.use('/api', routes)

app.listen(5000, ()=>{
    console.log("server started at 5000")
})
