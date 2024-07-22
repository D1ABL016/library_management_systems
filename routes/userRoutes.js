const express = require('express');
const router = express.Router()
const usrctrl = require('../modelController/userController')
const userAuth = require('../middlewares/personMiddleware')

router.get('/:id',userAuth,usrctrl.getPerson);

// router.post('/',usrctrl.postPerson);

router.delete('/:id',userAuth,usrctrl.deletePerson);

module.exports=router