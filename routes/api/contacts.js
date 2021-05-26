const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index.js')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./validation.js')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', async (req, res, next) => {
  console.log('Hi')
  try {
    const cats = await Contacts.getAll()
    return res.json({ status: 'success', code: 200, data: { cats } })
  } catch (e) {
    next(e)
  }
})

router.get('/api/contacts/:id', async (req, res, next) => {
  try {
    const cont = await Contacts.getById(req.params.id)
    if (cont) {
      return res.json({ status: 'success', code: 200, data: { cont } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found contact' })
  } catch (e) {
    next(e)
  }
})

router.post('/api/contacts', validationCreateContact, async (req, res, next) => {
  try {
    const cont = await Contacts.create(req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { cont } })
  } catch (e) {
    next(e)
  }
})

router.delete('/api/contacts/:id', async (req, res, next) => {
  try {
    const cont = await Contacts.remove(req.params.id)
    if (cont) {
      return res.json({ status: 'success', code: 200, data: { cont } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
})

router.put('/api/contacts:id', validationUpdateContact, async (req, res, next) => {
  try {
    const cont = await Contacts.update(req.params.id, req.body)
    if (cont) {
      return res.json({ status: 'success', code: 200, data: { cont } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
})

router.patch(
  '/api/contacts/:id',
  validationUpdateStatusContact,
  async (req, res, next) => {
    try {
      const cont = await Contacts.update(req.params.id, req.body)
      if (cont) {
        return res.json({ status: 'success', code: 200, data: { cont } })
      }
      return res.json({ status: 'error', code: 404, message: 'Not found' })
    } catch (e) {
      next(e)
    }
  },
)

module.exports = router
