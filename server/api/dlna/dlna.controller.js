import Dlna from '../../modules/Dlna'

const _showError = (res, errors) => res.status(400).json({ errors })

export const getDLNAServers = (req, res, next) =>
  res.status(200).json(Dlna.listDevices())

export const browseDlna = (req, res, next) => {
  req.checkQuery('uuid', 'uuid is required')
    .notEmpty()

  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        return _showError(
          res,
          result.array().map(err => err.msg)
        )
      }

      return Dlna.browse(
        req.query.uuid,
        req.query.path,
        req.query.limit,
        req.query.page
      )
        .then(data => res.status(200).json(data))
        .catch(err => _showError(res, [ err.message ]))
    })
    .catch(next)
}
