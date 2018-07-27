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

// DELETE AN ACTION BY ID
server.delete('/:id', (req, res, next) => {
  actionDb.remove(req.params.id).then((action) => {
    action == 0
      ? next(new Error('CANT_FIND_ITEM'))
      : actionDb.get().then((actions) => res.status(200).json(actions))
  })
})

module.exports = server
