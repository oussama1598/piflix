import OmxPlayer from '../../../modules/OmxPlayer'

export class StatusController {
  constructor () {
    this.io = null
  }

  init (io) {
    this.io = io

    this._watchStatus()
  }

  sendStatusOnConnect (socket) {
    socket.emit('status', OmxPlayer.Status)
  }

  _watchStatus () {
    OmxPlayer.on('status', data =>
      this.io.sockets.emit('status', data)
    )

    OmxPlayer.on('ready', status =>
      this.io.sockets.emit('ready', status)
    )
  }
}

export default new StatusController()
