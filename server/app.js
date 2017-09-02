import express from 'express'
import http from 'http'
import config from './config/environment'
import expressConfig from './config/express'
import Routes from './routes'

// Setup server
const app = express()
const server = http.createServer(app)
expressConfig(app)
Routes(app)

setImmediate(() => server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
}))

export default app
