const express = require('express');
const router = express.Router();
const bookctrl = require('../modelController/bookController')
const bookMiddleware = require('../middlewares/postBookMiddleware')
router.get('/:bookname',bookctrl.getbook);// search functionality


router.post('/',bookMiddleware , bookctrl.postbook);//librarian or admin

router.delete('/:bookid',bookMiddleware,bookctrl.deletebook);//librarian or admin

router.post('/issue',bookMiddleware,bookctrl.issuebook);//librarian or admin

router.post('/return',bookMiddleware,bookctrl.returnbook);//librarian or admin

module.exports=router