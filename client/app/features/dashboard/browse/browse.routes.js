import controller from './browse.controller'

/* @ngInject */
export default $stateProvider => {
  $stateProvider.state('dashboard.browse', {
    url: '/browse',
    template: require('./browse.tpl.html'),
    controller: controller.UID,
    controllerAs: 'browse'
  })
}
