// const { where } = require('sequelize')
const db = require('../models/main')
const person = db.person


const authbook = async (req, res, next) => {

    try {
        const personID = req.user.id
        const userResponse = await person.findAll({
            attributes: ['designation'],
            where: {
                person_id: personID
            }
        })
        if (userResponse.length) {
            let designation = userResponse[0].designation
            if (designation === "admin" || designation === "librarian")
                next()
            else throw 401;
        }
        else throw 401;
    }
    catch(err){
        if(err === 401) res.status(401).send("unauthorized");
        else    res.status(500).send("internal server error");
    }

}

module.exports = authbook