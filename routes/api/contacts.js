const express = require('express')
const router = express.Router()
// const Contacts = require('../../model/index.js')
const ctrl = require('../../controllers/users.js')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validateMongoId,
} = require('./validation.js')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', ctrl.getAll).post('/', validationCreateContact, ctrl.create)

router
  .get('/:id', validateMongoId, ctrl.getById)
  .delete('/:id', validateMongoId, ctrl.remove)
  .put('/:id', validateMongoId, validationUpdateContact, ctrl.update)

router.patch('/:id/favorite', validationUpdateStatusContact, ctrl.update)

module.exports = router
