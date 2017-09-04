import controller from './dashboard.controller'

export default $stateProvider => {
  'ngInject'
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: require('./dashboard.tpl.html'),
    abstract: true,
    controller: controller.UID,
    controllerAs: 'dashboard'
  })
}
