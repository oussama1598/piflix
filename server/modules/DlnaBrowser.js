import EventEmitter from 'events'
import { Client } from 'node-ssdp'

export default class DlnaBrowser extends EventEmitter {
  constructor () {
    super()

    this.ssdp = new Client()
    this.schema = 'urn:schemas-upnp-org:device:MediaServer:1'

    this.ssdp.on('response', this._parseResponse.bind(this))
  }

  watch () {
    this.ssdp.search(this.schema)

    this.watchInterval = setInterval(() => {
      this.ssdp.search(this.schema)
    }, 5000)
  }

  stop () {
    if (!this.watchInterval) return

    clearInterval(this.watchInterval)
  }

  _parseResponse (headers, statusCode, info) {
    if (!headers.LOCATION) return

    const uri = headers.LOCATION
    const uuid = headers.USN.replace(`::${this.schema}`, '')

    this.emit('found', { uri, uuid })
  }
}
