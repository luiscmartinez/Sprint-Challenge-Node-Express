const projectRoutes = require('./projectRoutes')
const actionRoutes = require('./actionRoutes')

module.exports = (server) => {
  server.use('/api/projects', projectRoutes)
  server.use('/api/actions', actionRoutes)
}
