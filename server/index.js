require('dotenv').config();


const express = require("express");

const app = express();

require("./models/db");

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send("App is running");
})

app.listen(PORT, ()=>{
    console.log(`server is running on port number ${PORT}`);

})