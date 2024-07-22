// const { where } = require('sequelize');
const db = require('../models/main')
let book = db.book
let issue_book = db.issueBook
let add_book =db.addBook


const getbook = async (req, res) => {
    try {
        // console.log("book name => ",req.params.bookname)
        const data = await book.findAll({            
            where: {
                book_name: req.params.bookname
            }
        });

        // console.log(data)

        if (data.length) {
            let flag = false
            if(flag){
                // if (role === 'librarian' || role === 'admin')    then show the history of that book
                const bookHistory = await issue_book.findAll({
                    attributes: { exclude: ['id', 'issued_to_id', 'issued_by_id'] },
                    where: {
                        issued_book: req.params.bookid
                    }
                });
                // console.log("heu")
                if (bookHistory) {
                    const obj = {
                        data:data[0],
                        history:bookHistory
                    }
                    res.status(200).send((obj))
                }
            }
            else        res.status(200).send((data))
        }
        else throw 400



    } catch (error) {
        switch (error) {
            case 400:
                res.status(400).send("No book with specified name")
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
            book_name: req.body.book_name,
            author: req.body.author,
            avialiable_units: req.body.avialiable_units
        })
        if(addedbook){
            // let username = "lakshay"
            let response = await add_book.create({
                book_id:addedbook.book_id,
                added_by:req.user.id,
                added_units:addedbook.avialiable_units,                
                added_book:addedbook.book_name
            })
            res.status(200).send(addedbook)

        }
    } catch (error) {
        if (error.name === "SequelizeDatabaseError") res.status(400).send(`${error.parent.sqlMessage}`)
        else res.status(404).send({ "error": error })
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
    try {

        let adminname = "iamadmin"
        let adminid = 1212
        let issuedbook = await issue_book.create({
            issued_by: adminname,
            issued_by_id:adminid,
            issued_to:req.body.name,
            issued_to_id:req.body.id,
            issued_book: req.body.bookid
            // avialiable_units: req.body.avialiable_units
        })
        if(addedbook){
            let username = "lakshay"
            let response = await add_book.create({
                book_id:addedbook.book_id,
                added_by:username,
                added_units:addedbook.avialiable_units,                
                added_book:addedbook.book_name
            })
            res.status(200).send(addedbook)

        }
    } catch (error) {
        if (error.name === "SequelizeDatabaseError") res.status(400).send(`${error.parent.sqlMessage}`)
        else res.status(404).send({ "error": error })
    }

}

const returnbook = async (req, res) => {

}

module.exports = {
    getbook, postbook, deletebook, issuebook, returnbook
}