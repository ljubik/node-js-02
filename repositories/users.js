const User = require('../model/index.js')

const getAll = async () => {
  const results = await User.find()
  return results
}

const getById = async (id) => {
  const result = await User.findOne({ _id: id })
  return result
}

const remove = async (id) => {
  const result = await User.findOneAndRemove({ _id: id })
  return result
}

const create = async (body) => {
  const result = await User.create(body)
  return result
}

const update = async (id, body) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
