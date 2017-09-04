import angular from 'angular'

// Import internal modules
import controller from './player.controller'
import directive from './player.directive'
import service from './player.service'

export default angular.module('player', [])
  .controller(controller.UID, controller)
  .directive('player', directive)
  .service(service.UID, service)
  .name
