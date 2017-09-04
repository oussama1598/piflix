import sConverter from 'seconds-converter'

export default class playerController {
  static get UID () {
    return 'playerController'
  }

  /* @ngInject */
  constructor ($rootScope, PlayerService, SocketService, $scope, debounce) {
    this.$rootScope = $rootScope
    this.PlayerService = PlayerService
    this.SocketService = SocketService
    this.$scope = $scope
    this.isChanging = false

    this.status = {
      running: false,
      paused: false,
      duration: 1000,
      position: 0,
      volume: 1
    }

    this.dOnPositionChange = debounce(1000, this.onPositionChange.bind(this))
    this.dOnVolumeChange = debounce(1000, this.onVolumeChange.bind(this))
  }

  $onInit () {
    this.$rootScope.$on('play', (event, source) => {
      this.PlayerService.play(encodeURIComponent(source))
    })

    this.SocketService.io.on('status', status => {
      if (this.isChanging) return

      this.$scope.$apply(() => {
        this.status = Object.assign(this.status, status)
      })
    })

    this.SocketService.io.on('ready', status => {
      this.$scope.$apply(() => {
        this.status = Object.assign(this.status, status)
      })
    })
  }

  onVolumeChange (volume) {
    this.PlayerService.setVolume(volume)
      .then(() => (this.isChanging = false))
  }

  onPositionChange (position) {
    this.PlayerService.setPosition(position)
      .then(() => (this.isChanging = false))
  }

  onPlayPause () {
    this.PlayerService.playPause()
  }

  muteToggle () {
    this.PlayerService.muteToggle()
  }

  onStop () {
    this.PlayerService.stop()
      .then(() => this._getStatus())
  }

  humanize (microSeconds) {
    const seconds = microSeconds / Math.pow(10, 6)
    const time = sConverter(seconds, 'sec')
    const timeStr = [
      this._format(time.minutes.toFixed(0)),
      this._format(time.seconds.toFixed(0))
    ]

    if (time.hours > 0) timeStr.unshift(this._format(time.hours.toFixed(0)))

    return timeStr.join(':')
  }

  _format (number) {
    if (number < 10) return `0${number}`

    return number
  }

  _getStatus () {
    this.PlayerService.getStatus()
      .then(status => {
        this.status = Object.assign(this.status, status)
      })
  }
}
