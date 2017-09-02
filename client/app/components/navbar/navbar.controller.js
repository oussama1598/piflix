export default class navbarController {
  static get UID () {
    return 'navbarController'
  }

  /* @ngInject */
  constructor ($mdSidenav, $rootScope, $state) {
    this.$mdSidenav = $mdSidenav
    this.$rootScope = $rootScope
    this.$state = $state

    this.backBtn = {
      show: false
    }

    this.menu = []
  }

  $onInit () {
    this.$rootScope.$on('backBtn', (event, data) => {
      this.backBtn = data
    })
  }

  MenuBackAction () {
    if (this.backBtn.show) return this.$state.go(this.backBtn.state, this.backBtn.params || {})

    this.$mdSidenav('left').toggle()
  }
}
