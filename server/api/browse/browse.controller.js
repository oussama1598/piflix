import FileBrowser from '../../modules/FileBrowser'

export const getDirStructure = (req, res, next) => {
  const uri = decodeURIComponent(req.query.path)

  FileBrowser.getDirStructure(
    req.query.path
      ? uri
      : undefined
  )
    .then(data => res.json(data))
    .catch(next)
}
