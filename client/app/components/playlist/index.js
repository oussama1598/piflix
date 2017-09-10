import angular from 'angular'

// Import internal modules
import controller from './playlist.controller'
import directive from './playlist.directive'

export default angular.module('playlist', [])
  .controller(controller.UID, controller)
  .directive('playlist', directive)
  .name
