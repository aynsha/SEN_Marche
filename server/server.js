const express= require('express')
const cors= require('cors')

require('dotenv').config({path : "./Config/.env"})
require("./Config/db")
const routes = require("./Routers/Routes")
const app= express()

const port= 5000


app.use(cors())
app.use(express.json())

app.use("/api" , routes)
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})