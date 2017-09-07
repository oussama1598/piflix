import socketIo from 'socket.io'
import StatusController from './controllers/status.controller'
import DlnaController from './controllers/dlna.controller'

export default server => {
  const io = socketIo(server)

  StatusController.init(io)
  DlnaController.init(io)

  io.on('connection', socket => {
    StatusController.sendStatusOnConnect(socket)
  })
}
