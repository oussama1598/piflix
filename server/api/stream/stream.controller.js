import Streamer from '../../modules/Streamer'

export const stream = (req, res, next) => {
  req.checkBody('path', 'path is required')
    .notEmpty()
    .notDirAndExists()
    .withMessage('Path is not for a file, or it does not exist')

  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        return res.status(400).json({
          errors: result.array()
        })
      }

      return Streamer.add(req.body.path)
        .then(id => res.status(200).json({
          id
        }))
    }).catch(next)
}

export const streamFile = Streamer.getFile.bind(Streamer)

export const getStreams = (req, res) => {
  const streams = []
  Streamer.files.forEach((path, id) => {
    streams.push({
      id,
      path
    })
  })

  res.json(streams)
}
