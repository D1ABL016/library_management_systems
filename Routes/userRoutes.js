const express = require('express');
const router = express.Router()
const usrctrl = require('../modelController/userController')

router.get('/user/:id',usrctrl.getPerson);

router.post('/user',usrctrl.postPerson);

router.delete('/user/:id',usrctrl.deletePerson);

module.exports=router