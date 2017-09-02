import send from 'send'

export class Streamer {
  constructor () {
    this.files = new Map()
  }

  add (path) {
    const id = Math.random().toString(36).substring(3)

    this.files.set(id, path)
    // Vlc.stream(id)

    return Promise.resolve(id)
  }

  getFile (req, res, next) {
    const id = req.params.id
    const path = this.files.get(id)

    if (!path) return res.sendStatus(404)
    // check if its streamable

    send(req, path).pipe(res)
  }
}

export default new Streamer()
