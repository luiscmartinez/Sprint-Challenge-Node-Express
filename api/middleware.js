const projectRoutes = require('./projectRoutes')

module.exports = (server) => {
  server.use('/api/projects', projectRoutes)
}
