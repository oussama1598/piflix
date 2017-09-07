import request from 'request'

export class Streamer {
  constructor () {
    this.files = new Map()
  }

  add (uri, _input) {
    const id = Math.random().toString(36).substring(3)
    const entries = [...this.files.values()]
    const entryExist = entries.filter(entry => entry.uri === uri)[0]

    if (entryExist) return Promise.resolve(entryExist.id)

    this.files.set(id, {
      uri,
      id
    })

    return Promise.resolve(id)
  }

  getFile (req, res, next) {
    const id = req.params.id
    const details = this.files.get(id)

    if (!details) return res.sendStatus(404)

    const uri = details.uri

    return this._stream(uri, req, res)
  }

  _stream (uri, req, res) {
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
