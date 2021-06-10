const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const schemaUpdateContact = Joi.object({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}).min(1)

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ''),
    })
  }
}

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  },
  validationUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next)
  },
  validateMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({
        status: 400,
        message: 'Invalid ObjectId',
      })
    }
    next()
  },
}
