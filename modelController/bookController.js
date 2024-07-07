const db = require('../models/main')
let book = db.book
let issue_book = db.issuebook


const getbook = async (req, res) => {
    try {
        const data = await book.findAll({
            attributes: { exclude: ['book_id'] },
            where: {
                book_id: req.params.bookid
            }
        });

        // console.log(data)
        if (data.length) res.status(200).send(data)
        else throw 400



    } catch (error) {
        switch (error) {
            case 400:
                res.status(400).send("invalid id")
                break
            default:
                res.status(404).send({ "error": error })
                break;
        }
    }
}

const postbook = async (req, res) => {
    try {
        let addedbook = await book.create({
            book_name: req.body.name,
            author: req.body.author,
            avialiable_units: req.body.units
        })
        res.status(200).send("book added succesfuly")
    } catch (error) {
        if (error.name === "SequelizeDatabaseError")    res.status(400).send(`${error.parent.sqlMessage}`)
        else    res.status(404).send({"error":error})
    }
}

const deletebook = async (req, res) => {
    try {
        let delBook = await book.destroy({
            where: {
                book_id: req.params.bookid
            }
        })
        if (delBook) res.status(200).send("book deleted succesfully ")
        else throw 400
    } catch (error) {
        if (error === 400) res.status(error).send("enter a valid id ")
        else if (error.name === "SequelizeDatabaseError") res.status(400).send(`${error.parent.sqlMessage}`)
        else res.status(404).send({ "error": error })
    }
}

const issuebook = async (req, res) => {

}

const returnbook = async (req, res) => {

}

module.exports = {
    getbook, postbook, deletebook, issuebook, returnbook
}