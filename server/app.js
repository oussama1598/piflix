import express from 'express'
import http from 'http'
import config from './config/config'
import expressConfig from './config/express'
import Routes from './routes'
import Dlna from './modules/Dlna'
import socket from './services/socket'

// Setup server
const app = express()
const server = http.createServer(app)
expressConfig(app)
Routes(app)
Dlna.init()
socket(server)

setImmediate(() => server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
}))

export default app
