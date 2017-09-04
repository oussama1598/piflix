import send from 'send'
import ip from 'ip'
import { checkIfStreamable } from './Streamable'
import request from 'request'

export class Streamer {
  constructor () {
    this.files = new Map()
    this.supportedInputes = ['local', 'internet']
  }

  add (uri, _input) {
    const id = Math.random().toString(36).substring(3)
    const input = _input.toLowerCase()

    if (this.supportedInputes.indexOf(input) < 0) return Promise.reject(new Error('input is required'))

    const entries = [...this.files.values()]
    const entryExist = entries.filter(entry => entry.uri === uri)[0]

    if (entryExist) return Promise.resolve(entryExist.id)

    this.files.set(id, {
      uri,
      input: input,
      id
    })

    return Promise.resolve(id)
  }

  getFile (req, res, next) {
    const id = req.params.id
    const details = this.files.get(id)

    if (!details) return res.sendStatus(404)

    const uri = details.uri
    const input = details.input
    switch (input) {
      case 'local':
        return this._localStreaming(uri, req, res)
      case 'internet':
        return this._internetStreaming(uri, req, res)
    }
  }

  getLocalIp () {
    return ip.address()
  }

  isStreamable (filepath) {
    return checkIfStreamable(filepath)
  }

  _localStreaming (path, req, res) {
    send(req, path).pipe(res)
  }

  _internetStreaming (uri, req, res) {
    const range = req.headers.range

    request({
      url: uri,
      headers: {
        range
      }
    }).pipe(res)
  }
}

export default new Streamer()
