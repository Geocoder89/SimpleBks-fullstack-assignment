const express = require('express')
const {authenticate,updateUser} = require('../Users/userController')


const router = express.Router()



router.post('/authenticate',authenticate)
router.put('/accounts',updateUser)



module.exports = router