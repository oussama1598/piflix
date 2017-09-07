import socketIo from 'socket.io'
import DlnaController from './controllers/dlna.controller'

export default server => {
  const io = socketIo(server)

  DlnaController.init(io)
}
