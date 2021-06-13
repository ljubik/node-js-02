const Contacts = require('../repositories/contacts')

const getAll = async (req, res, next) => {
  console.log('Hi')
  try {
    const contacts = await Contacts.getAll()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.id)
    if (contact) {
      console.log(contact)
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.remove(req.params.id)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const contact = await Contacts.update(req.params.id, req.body)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
