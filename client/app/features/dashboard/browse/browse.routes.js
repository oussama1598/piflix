import controller from './browse.controller'

/* @ngInject */
export default $stateProvider => {
  $stateProvider.state('dashboard.browse', {
    url: '/dlna/:uuid',
    template: require('./browse.tpl.html'),
    controller: controller.UID,
    controllerAs: 'browse',
    params: {
      uuid: null
    }
  })
}
