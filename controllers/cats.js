const Cats = require('../repositories/cats')

const getAll = async (req, res, next) => {
  console.log('Hi')
  try {
    const cats = await Cats.getAll()
    return res.json({ status: 'success', code: 200, data: { cats } })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const cat = await Cats.getById(req.params.id)
    if (cat) {
      console.log(cat)
      return res.json({ status: 'success', code: 200, data: { cat } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const cat = await Cats.create(req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { cat } })
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const cat = await Cats.remove(req.params.id)
    if (cat) {
      return res.json({ status: 'success', code: 200, data: { cat } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const cat = await Cats.update(req.params.id, req.body)
    if (cat) {
      return res.json({ status: 'success', code: 200, data: { cat } })
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
