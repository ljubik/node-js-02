const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users.js')
const guard = require('../../../helpers/guard.js')

router.post('/users/signup', ctrl.register)
router.post('/users/login', ctrl.login)
router.post('/users/logout', guard, ctrl.logout)
router.get('/users/current', guard, ctrl.login)

module.exports = router
