export default ($urlRouterProvider, $locationProvider) => {
  'ngInject'

  $urlRouterProvider.otherwise('/dashboard/browse')
  $locationProvider.html5Mode(true)
}
