const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, './contacts.json'), 'utf8')
  return JSON.parse(data)
}

const getAll = async () => {
  return await readData()
}

const getById = async (id) => {
  const data = await readData()
  const [result] = data.filter((contact) => contact.id === id)
  return result
}

const remove = async (id) => {
  const data = await readData()
  const index = data.findIndex((contact) => contact.id === id)
  if (index !== -1) {
    const result = data.splice(index, 1)
    await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data))
    return result
  }
  return null
}

const create = async (body) => {
  const id = uuid()
  const record = {
    id,
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  }
  const data = await readData()
  data.push(record)
  await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data))
  return record
}

const update = async (id, body) => {
  const data = await readData()
  const [result] = data.filter((contact) => contact.id === id)
  if (result) {
    Object.assign(result, body)
    await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data))
  }
  return result
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
