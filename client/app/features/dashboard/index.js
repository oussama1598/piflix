import angular from 'angular'
import uirouter from 'angular-ui-router'

// Import base modules
import routes from './dashboard.routes'
import controller from './dashboard.controller'

export default angular.module('vlcStream.dashboard', [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name
