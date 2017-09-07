import OmxPlayer from '../../modules/OmxPlayer'

const _parseCommand = (command, query) => {
  switch (command.toLowerCase()) {
    case 'play':
      return OmxPlayer.play(query.source)
    case 'playpause':
      return OmxPlayer.playPause()
    case 'pause':
      return OmxPlayer.pause()
    case 'stop':
      return OmxPlayer.stop()
    case 'seek':
      return OmxPlayer.seek(parseInt(query.to))
    case 'volume':
      return OmxPlayer.volume(parseFloat(query.value))
    case 'unmutemute':
      return OmxPlayer.muteToggle()
    case 'status':
      return OmxPlayer.status()
  }
}

export default (req, res, next) => {
  _parseCommand(req.params.command, req.query)
    .then(data => data
      ? res.status(200).json(data)
      : res.sendStatus(200)
    )
    .catch(err => res.status(400).json({
      errors: [ err.message ]
    }))
}
