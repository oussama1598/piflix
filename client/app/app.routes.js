export default ($urlRouterProvider, $locationProvider) => {
  'ngInject'

  $urlRouterProvider.otherwise('/dashboard/dlna')
  $locationProvider.html5Mode(true)
}
