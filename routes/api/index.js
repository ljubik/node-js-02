const express = require('express')
const router = express.Router()

router.use('/users', require('./users/index.js'))
router.use('/contacts', require('./contacts/contacts.js'))

module.exports = router
