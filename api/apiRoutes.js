const projectRoutes = require('./projectRoutes')
const actionRoutes = require('./actionRoutes')

module.exports = (server) => {
  server.use('/api/projects', projectRoutes)
  server.use('/api/actions', actionRoutes)
  server.use((err, req, res, next) => {
    switch (err.message) {
      case 'CANT_FIND_PRO':
        res
          .status(404)
          .send({ status: 'There is no existing project by that ID' })
        break

      default:
        res.status(500).send({ error: err.message })
        break
    }
  })
}
