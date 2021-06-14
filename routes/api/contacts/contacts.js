const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts.js')
const guard = require('../../../helpers/guard.js')

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

router
  .get('/', guard, ctrl.getAll)
  .post('/', guard, validationCreateContact, ctrl.create)

router
  .get('/:id', guard, validateMongoId, ctrl.getById)
  .delete('/:id', guard, validateMongoId, ctrl.remove)
  .put('/:id', guard, validateMongoId, validationUpdateContact, ctrl.update)

router.patch('/:id/favorite', guard, validationUpdateStatusContact, ctrl.update)

router.get('/', ctrl.getAll).post('/', validationCreateContact, ctrl.create)

module.exports = router
