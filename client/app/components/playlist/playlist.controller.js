export default class playlistController {
  static get UID () {
    return 'playlistController'
  }

  /* @ngInject */
  constructor ($mdSidenav, KodiSocketService, $state, $timeout) {
    this.$mdSidenav = $mdSidenav
    this.KodiSocketService = KodiSocketService
    this.$state = $state
    this.$timeout = $timeout
  }

  $onInit () {
    console.log('ok')

    this.$timeout(() => this.$mdSidenav('right').toggle(), 1000)
  }
}
