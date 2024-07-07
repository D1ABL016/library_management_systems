const express = require('express');
const router = express.Router();
const bookctrl = require('../modelController/bookController')

router.get('/book/:bookid',bookctrl.getbook);


router.post('/book',bookctrl.postbook);

router.delete('/book/:bookid',bookctrl.deletebook);

router.post('/book/issue',bookctrl.issuebook);

router.post('/book/return',bookctrl.returnbook);

module.exports=router