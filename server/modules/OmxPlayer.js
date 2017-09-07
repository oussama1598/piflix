import {
  spawn
} from 'child_process'
import dbus from 'dbus-native'
import fs from 'fs'
import EventEmitter from 'events'
import { isURL } from 'validator'

export class OmxPlayer extends EventEmitter {
  constructor () {
    super()

    this.process = null
    this.defaultStatus = {
      running: false,
      paused: true,
      duration: 0,
      position: 0,
      volume: 1,
      muted: false
    }
    this.stdbufArgs = ['-i0', '-o0', '-e0', 'omxplayer']
    this.Status = Object.assign({}, this.defaultStatus)

    this.emit('ready', this.Status)
  }

  play (_source) {
    if (!_source) {
      return Promise.reject(
        new Error('No source url provided')
      )
    }

    if (this.Status.running) this.stop()

    const source = decodeURIComponent(_source)

    if (!isURL(source)) {
      return Promise.reject(
        new Error('Only stream urls are supported')
      )
    }

    const args = this.stdbufArgs.concat(['-b', '-s', source])
    const pr = spawn('stdbuf', args)
    this.bus = dbus.sessionBus({
      busAddress: fs.readFileSync('/tmp/omxplayerdbus.pi', 'ascii').trim()
    })

    pr.stdout.on('data', this._parseOutput.bind(this))

    pr.on('close', (code) => {
      this.Status = Object.assign({}, this.defaultStatus)

      this.emit('status', this.Status)
    })

    return Promise.resolve()
  }

  pause () {
    return this._sendCommand('Pause')
  }

  playPause () {
    return this._sendCommand('PlayPause')
  }

  stop () {
    return this._sendCommand('Stop')
  }

  seek (pos) {
    if (isNaN(pos)) return Promise.reject(new Error('to query is required'))

    return this._sendCommand('SetPosition', {
      signature: 'ox',
      body: [ '/not/used', pos ]
    })
  }

  volume (volume) {
    if (
      isNaN(volume) &&
        volume < 0 &&
        volume > 1
    ) return Promise.reject(new Error('value query is required'))

    return this._busInvoke('org.freedesktop.DBus.Properties', 'Volume', {
      signature: 'd',
      body: [volume]
    })
      .then(() => (this.Status.volume = volume))
  }

  muteToggle () {
    if (this.Status.muted) {
      this.Status.muted = false
      return this._sendCommand('Unmute')
    }

    this.Status.muted = true
    return this._sendCommand('Mute')
  }

  status () {
    if (!this.Status.running) {
      return Promise.resolve({
        running: false
      })
    }

    return Promise.resolve(this.Status)
  }

  _parseOutput (_data) {
    if (!this.Status.running) {
      this.Status.running = true
      this._firstData()
    }

    const data = _data.toString('utf8').trim()

    if (data.indexOf('M:') < 0) return

    const details = data.split(/M:|V:|A:|Cv:|Ca:/)
    const position = Math.abs(parseInt(details[1].trim()))

    this.Status.paused = position === this.Status.position
    this.Status.position = position

    if (this.Status.duration > 0) this.emit('status', this.Status)
  }

  _firstData () {
    this._getStatus()
      .then(status => {
        this.Status.duration = status.Duration
        this.Status.volume = status.Volume
      })
  }

  _getStatus () {
    return Promise.all(
      this._busGetProperties([
        'Duration',
        'Volume'
      ])
    ).then(results =>
      results.reduce((a, b) => Object.assign(a, b))
    )
  }

  _busGetProperties (members) {
    return members.map(member => this._busInvoke(
      'org.freedesktop.DBus.Properties',
      member
    )
      .then(data => {
        const obj = {}
        obj[member] = data

        return obj
      }))
  }

  _busInvoke (interfaceName, member, obj = {}) {
    return new Promise((resolve, reject) => {
      this.bus.invoke(Object.assign(obj, {
        path: '/org/mpris/MediaPlayer2',
        interface: interfaceName,
        destination: 'org.mpris.MediaPlayer2.omxplayer',
        member
      }), (err, value) => {
        if (err) reject(err)

        resolve(value)
      })
    })
  }

  _sendCommand (command, obj = {}) {
    if (this.Status.running) {
      return this._busInvoke('org.mpris.MediaPlayer2.Player', command, obj)
    }

    return Promise.reject(
      new Error('omxplayer is not running')
    )
  }
}

export default new OmxPlayer()
