const server = require('express')()
const actionDb = require('../data/helpers/actionModel')

// GET ALL ACTIONS
server.get('/', (req, res, next) => {
  actionDb.get().then((actions) => res.status(200).json(actions)).catch(next)
})

// GET ACTION BY ID
server.get('/:id', (req, res, next) => {
  actionDb
    .get(req.params.id)
    .then((action) => {
      action === undefined
        ? next(new Error('CANT_FIND_ITEM'))
        : res.status(200).json(action)
    })
    .catch(next)
})

module.exports = server
