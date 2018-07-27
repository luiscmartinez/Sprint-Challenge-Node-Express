const server = require('express')()
const projectDb = require('../data/helpers/projectModel')

server.get('/', (req, res, next) => {
  projectDb.get().then((projects) => res.status(200).json(projects)).catch(next)
})
module.exports = server
