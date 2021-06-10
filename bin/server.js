const app = require('../app.js')
const db = require('../model/db.js')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((e) => {
  console.log(`Error: ${e.message}`)
})
