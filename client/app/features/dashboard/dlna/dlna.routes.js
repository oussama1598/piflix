import controller from './dlna.controller'

/* @ngInject */
export default $stateProvider => {
  $stateProvider.state('dashboard.dlna', {
    url: '/dlna',
    template: require('./dlna.tpl.html'),
    controller: controller.UID,
    controllerAs: 'dlna'
  })
}
