const server = require('express')()
const projectDb = require('../data/helpers/projectModel')

// GET ALL PROJECTS
server.get('/', (req, res, next) => {
  projectDb.get().then((projects) => res.status(200).json(projects)).catch(next)
})

// GET A PROJECT BY ID
server.get('/:id', (req, res, next) => {
  projectDb
    .get(req.params.id)
    .then((project) => {
      project === undefined
        ? next(new Error('CANT_FIND_PRO'))
        : res.status(200).json(project)
    })
    .catch(next)
})

module.exports = server
