export default $stateProvider => {
  'ngInject'
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: require('./dashboard.tpl.html'),
    abstract: true,
    controller: () => {},
    controllerAs: 'dashboard'
  })
}
