const Users = require('../repositories/users')

const getAll = async (req, res, next) => {
  console.log('Hi')
  try {
    const users = await Users.getAll()
    return res.json({ status: 'success', code: 200, data: { users } })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      console.log(user)
      return res.json({ status: 'success', code: 200, data: { user } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const user = await Users.create(req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { user } })
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const user = await Users.remove(req.params.id)
    if (user) {
      return res.json({ status: 'success', code: 200, data: { user } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const user = await Users.update(req.params.id, req.body)
    if (user) {
      return res.json({ status: 'success', code: 200, data: { user } })
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
