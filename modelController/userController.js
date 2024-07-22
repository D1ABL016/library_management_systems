// const { where } = require('sequelize');
const db = require('../models/main');
// const bcrypt = require('bcrypt')
const person = db.person

// person.comparePassword = async (userpassword) => {
//     console.log("jiiiiiii")    
//     let salt = await bcrypt.genSalt(10);
//     let currpassword = await bcrypt.hashPassword(userpassword, salt)
//     let personPass = person.findAll({
//         where: {
//             passcode: currpassword
//         }
//     })
//     if (personPass.length) return true
//     else return false
// }

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
        // }
    }
    catch (err) {
        if (err === 400)
            res.status(err).send('invalid id ');
        else if (err === 401)
            res.status(err).send('UNAUTHORIZED');
        else
            res.send(404).send({ "connection error": err })
    }

}

// const postPerson = async (req, res) => {
//     try {
//         // genereate salt
//         // let salt = await bcrypt.genSalt(10);
//         // console.log("salt",salt)
//         // if(salt)    
//         // let pass = req.body.passcode
//         // let hashedPassword = await bcrypt.hash(pass, salt)
//         // console.log("hashed Password",hashedPassword)
//         let hashedPassword = true;
//         if (hashedPassword) {
//             const user = await person.create({
//                 mail: req.body.mail,
//                 passcode: req.body.passcode,
//                 // passcode: hashedPassword,
//                 first_name: req.body.first_name,
//                 designation: req.body.designation
//             });
//             if(user)
//             res.status(200).send("person created succesfully");
//             else    throw new Error("user nnot generated")
//         }
//         else{
//             throw new Error("hashed password not generated")
//         }
//     }
//     catch (err) {
//         if (err.name === "SequelizeUniqueConstraintError") {
//             let n = err.errors.length
//             let finalerror = ""
//             for (let i = 0; i < n; i++) {
//                 let str = err.errors[i].message
//                 finalerror += str + '\n';
//             }
//             res.status(400).send({"err":finalerror})
//         }

//         else if (err.name === "SequelizeValidationError") {

//             let arr = err.errors[0].validatorArgs[0]
//             res.status(400).send(`${err}`)
//         }
//         else res.status(404).send({ "some error occured": err })

//     }
// }

const deletePerson = async (req, res) => {
    try {


        let user = await person.destroy({
            where: {
                person_id: req.params.id
            }
        })

        if (user) res.status(200).send("person deleted succesfuly");
        else throw 400

        // let id = req.params.id

    }
    catch (err) {
        if (err === 400)
            res.status(err).send('enter a valid id')
        else if (err === 401)
            res.status(err).send('UNAUTHORIZED');
        else if (err.name === "SequelizeDatabaseError")
            res.status(400).send(`${err}`)
        else
            res.status(404).send({ "error": err })
    }
}

// jajsnjnnajnsjnajnsjanjjannsjnjas
//jian218711216hh4@gmail.com


module.exports = {
    getPerson, deletePerson
}
