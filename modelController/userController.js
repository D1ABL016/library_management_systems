const db = require('../models/main');
const person = db.person


const getPerson = async (req, res) => {
    try {
        const data = await person.findAll({
            attributes: { exclude: ['passcode'] },
            where: {
                person_id: req.params.id
            }
        });

        if (data.length) res.status(200).send({ data: data })
        else throw 400
    }
    catch (err) {
        if (err === 400)
            res.status(err).send('invalid id ');
        else
            res.send(404).send({ "connection error": err })
    }

}

const postPerson = async (req, res) => {
    try {
        const user = await person.create({
            mail: req.body.mail,
            passcode: req.body.passcode,
            first_name: req.body.first_name,
            designation: req.body.designation
        });
        res.status(200).send("person created succesfully");
    }
    catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            let n = err.errors.length
            let finalerror = ""
            for (let i = 0; i < n; i++) {
                let str = err.errors[i].message
                finalerror += str + '\n';
            }
            res.status(400).send(finalerror)
        }

        else if (err.name === "SequelizeValidationError") {

            let arr = err.errors[0].validatorArgs[0]
            res.status(400).send(`desigantion must be a part of ${arr}`)
        }
        else res.status(404).send({ "some error occured": err })

    }
}

const deletePerson = async (req, res) => {
    try {
        // let id = req.params.id

        let user = await person.destroy({
            where: {
                person_id: req.params.id
            }
        })

        if (user) res.status(200).send("person deleted succesfuly");
        else throw 400
    }
    catch (err) {
        if (err === 400)
            res.status(err).send('enter a valid id')
        else if (err.name === "SequelizeDatabaseError")
            res.status(400).send(`${err}`)
        else
            res.status(404).send({ "error": err })
    }
}


module.exports = {
    getPerson, postPerson, deletePerson
}
