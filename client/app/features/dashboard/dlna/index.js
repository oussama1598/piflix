import angular from 'angular'
import uirouter from 'angular-ui-router'

// Import internal modules
import controller from './dlna.controller'
import routes from './dlna.routes'
import service from './dlna.service'

export default angular.module('PiFlix.dlna', [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .service(service.UID, service)
  .name
