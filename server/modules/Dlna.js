import EventEmitter from 'events'
import DlnaBrowser from './DlnaBrowser'
import DlnaDevice from './DlnaDevice'

export class Dlna extends EventEmitter {
  constructor () {
    super()

    this.devices = new Map()
    this.DlnaBrowser = new DlnaBrowser()
    this.DlnaBrowser
      .on('found', this._checkDevice.bind(this))
  }

  init () {
    this.DlnaBrowser.watch()
    return this
  }

  listDevices () {
    return [...this.devices.values()].map(device => device.deviceDetails)
  }

  browse (uuid, path, limit, page) {
    const device = this.devices.get(uuid)

    if (!device) {
      return Promise.reject(
        new Error(`No device match for this uuid ${uuid}`)
      )
    }

    return device.browse(path, limit, page)
  }

  _checkDevice ({ uri, uuid }) {
    const device = this.devices.get(uuid)

    if (!device) {
      const newDevice = new DlnaDevice(uri, uuid)

      newDevice
        .on('ready', data => {
          this.emit('found', data)
          this.devices.set(uuid, newDevice)
        })
        .on('remove', uuid => {
          this.devices.delete(uuid)
          this.emit('remove', uuid)
        })

      return true
    }

    if (device.heartBeat) device.heartBeat()
  }
}

export default new Dlna()
