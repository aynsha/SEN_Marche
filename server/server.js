const express= require('express')
const cors= require('cors')
const path= require('path')

require('dotenv').config({path : "./Config/.env"})
require("./Config/db")
const routes = require("./Routers/Routes")
const app= express()


const port= process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.use("/api" , routes)
app.use('/uploads', express.static(path.join(__dirname ,'./uploads')));
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})