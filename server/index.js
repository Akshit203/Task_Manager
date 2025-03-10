require('dotenv').config();
const express = require("express");
const app = express();
require("./models/db");
const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/taskRouter');
const bodyParser = require('body-parser');

app.get('/', (req, res)=>{
    res.send("App is running");
})

app.use(bodyParser.json());

app.use('/tasks',taskRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on port number ${PORT}`);

})