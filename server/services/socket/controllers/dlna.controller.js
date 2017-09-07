import Dlna from '../../../modules/Dlna'

export class DlnaController {
  constructor () {
    this.io = null
  }

  init (io) {
    this.io = io

    this._watchEvents()
  }

  _watchEvents () {
    Dlna.on('found', data =>
      this.io.sockets.emit('dlna:found', data)
    )

    Dlna.on('remove', uuid =>
      this.io.sockets.emit('dlna:remove', uuid)
    )
  }
}

export default new DlnaController()
