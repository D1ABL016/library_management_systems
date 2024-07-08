const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const con = require('./db.js');
const models = require('./models/main.js');
const PORT = 3000;
const bookRoutes = require('./Routes/bookroutes.js')
const userRoutes = require('./Routes/userRoutes.js')

const location = 'http:127.0.0.1:3000/'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', bookRoutes);
app.use('/', userRoutes);

app.post('/', async function (req, res) {
    let mail = req.body.mail;
    let password = req.body.password;
    // let ans = "maii hoooooon"
    res.status(200).send({ mail, password });
})

app.listen(PORT, () => {
    console.log(`Server is running on ` + location);
});


