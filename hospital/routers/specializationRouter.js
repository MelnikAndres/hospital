const express = require('express')
const router = express.Router()
const specializationController = require('../controllers/specialization/specializationController')

router.get('/', specializationController.getAllSpecializations)


module.exports = router