export default class dlnaController {
  static get UID () {
    return 'dlnaController'
  }

  /* @ngInject */
  constructor ($rootScope, $scope, SocketService, DlnaService, NotificationService, $state) {
    this.$rootScope = $rootScope
    this.$scope = $scope
    this.SocketService = SocketService
    this.DlnaService = DlnaService
    this.NotificationService = NotificationService
    this.$state = $state

    this.devices = new Map()
    this.loading = true
  }

  $onInit () {
    this.$rootScope.$broadcast('backBtn', {
      show: false
    })

    this.DlnaService.getDevices()
      .then(this._dlnaDevices.bind(this))
      .catch(err => this.NotificationService.show(err))

    this.SocketService.io.on('dlna:found', this._deviceAdded.bind(this))
    this.SocketService.io.on('dlna:remove', this._deviceRemoved.bind(this))

    this.$rootScope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name === 'dashboard.dlna') return

      this.SocketService.io.off('dlna:found', this._deviceAdded.bind(this))
      this.SocketService.io.off('dlna:remove', this._deviceRemoved.bind(this))
    })
  }

  listDevices () {
    return [...this.devices.values()]
  }

  onBrowseDlna (uuid) {
    this.$state.go('dashboard.browse', { uuid })
  }

  _dlnaDevices (devices) {
    this.loading = false
    devices.forEach(device => {
      this.devices.set(device.uuid, device)
    })
  }

  _deviceAdded (device) {
    if (this.devices.has(device.uuid)) return

    this.$scope.$apply(() => {
      this.devices.set(device.uuid, device)
    })
  }

  _deviceRemoved (uuid) {
    if (!this.devices.has(uuid)) return

    this.$scope.$apply(() => {
      this.devices.delete(uuid)
    })
  }
}
