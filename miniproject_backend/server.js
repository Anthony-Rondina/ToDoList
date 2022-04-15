require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const itemController = require("./controllers/item")



app.use(cors())
app.use(express.json())
app.use("/items", itemController)


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})