import Streamer from '../../modules/Streamer'
import { port } from '../../config/environment'

export const stream = (req, res, next) => {
  req.checkBody('streamURI', 'streamURI is required')
    .notEmpty()
  req.checkBody('input', 'input is required')
    .notEmpty()

  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        return res.status(400).json({
          errors: result.array().map(err => err.msg)
        })
      }

      return Streamer.add(req.body.streamURI, req.body.input)
        .then(id => res.status(200).json({
          streamUrl: `http://${Streamer.getLocalIp()}:${port}/api/stream/${id}`
        }))
        .catch(err => res.status(400).json({
          errors: [ err.message ]
        }))
    }).catch(next)
}

export const streamFile = Streamer.getFile.bind(Streamer)

export const getStreams = (req, res) => {
  const streams = []
  Streamer.files.forEach(({uri, input}, id) => {
    streams.push({
      id,
      uri,
      input
    })
  })

  res.json(streams)
}
