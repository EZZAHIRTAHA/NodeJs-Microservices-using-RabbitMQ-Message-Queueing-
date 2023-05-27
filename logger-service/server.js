const express = require('express');
const app = express();
const colors = require('colors')
const bodyParser = require('body-parser');
require("dotenv").config();
const producer = require('./producer')


app.use(bodyParser.json('application/json'));


app.post("/sendLog", async(req, res, next) => {
    await producer.publishMessage(req.body.logType, req.body.message);
    res.send();
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on http://localhost:${process.env.PORT}`.cyan.underline.bold);
});


app.get('/', (req, res) => {
    res.send("Hello");
});



