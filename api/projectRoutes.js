const server = require('express')()
const projectDb = require('../data/helpers/projectModel')
const actionDb = require('../data/helpers/actionModel')

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

// GET ALL ACTIONS BY A SPECIFIC PROJECT
server.get('/:id/actions', (req, res, next) => {
  projectDb
    .getProjectActions(req.params.id)
    .then((actions) => {
      actions.length > 0 ? res.status(200).json(actions) : res.sendStatus(204)
    })
    .catch(next)
})

// ADD A NEW PROJECT
server.post('/', (req, res, next) => {
  const newProject = req.body
  const name = newProject.name
  if (!name || name.length > 120) {
    next(new Error('INVALID_NAME'))
  }
  projectDb
    .insert(newProject)
    .then((newPost) => res.status(201).json(newPost))
    .catch(next)
})

// UPDATE A PROJECT
server.put('/:id', (req, res, next) => {
  const updatedProject = req.body
  const projectName = updatedProject.name
  const id = req.params.id
  if (!projectName || projectName.length > 120) {
    next(new Error('INVALID_NAME'))
  }
  projectDb
    .update(id, updatedProject)
    .then((update) => res.status(200).json(update))
    .catch(next)
})

// DELETE A PROJECT
server.delete('/:id', (req, res, next) => {
  projectDb.remove(req.params.id).then((project) => {
    project == 0
      ? next(new Error('CANT_FIND_PRO'))
      : projectDb.get().then((projects) => res.status(200).json(projects))
  })
})

// CREATE A NEW ACTION FOR PROJECT
server.post('/:id/newaction', (req, res, next) => {
  const { notes, description } = req.body
  const projectId = req.params.id
  const newAction = { project_id: projectId, ...req.body }
  if (!notes || description.length > 128) {
    next(new Error('INVALID'))
  }
  actionDb
    .insert(newAction)
    .then((action) => res.status(201).json(action))
    .catch(next)
})

// UPDATE AN ACTION FOR PROJECT
server.put('/:id/actions/:actionid', (req, res, next) => {
  const { notes, description } = req.body
  const id = req.params.actionid
  const updatedAction = { ...req.body }
  if (!notes || description.length > 128) {
    next(new Error('INVALID'))
  }
  actionDb
    .update(id, updatedAction)
    .then((update) => res.status(200).json(update))
    .catch(next)
})

module.exports = server
