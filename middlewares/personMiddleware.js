// const db = require('../db')
// const person = db.person


const authuser = (req, res, next) => {
    if (req.user.id == req.params.id) {
        next();
    }
    else{
        res.status(401).send("unauthorized");
    }

}

module.exports = authuser;