import { getFormats } from '../../lib/ytdl'

export const getStreams = (req, res, next) => {
  req.checkQuery('url', 'url is required')
    .notEmpty()
    .isYoutubeUrl()
    .withMessage('url should be a youtube one')

  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        return res.status(400).json({
          errors: result.array().map(err => err.msg)
        })
      }

      return getFormats(req.query.url)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({
          errors: [ err ]
        }))
    })
    .catch(next)
}
