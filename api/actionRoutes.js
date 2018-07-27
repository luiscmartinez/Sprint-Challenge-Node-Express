const server = require('express')()
const actionDb = require('../data/helpers/actionModel')

server.get('/', (req, res, next) => {
  actionDb.get().then((actions) => res.status(200).json(actions)).catch(next)
})
module.exports = server
