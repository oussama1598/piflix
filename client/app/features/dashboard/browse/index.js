// Import Style
import './browse.scss'

import angular from 'angular'
import uirouter from 'angular-ui-router'

// Import internal modules
import controller from './browse.controller'
import routes from './browse.routes'
import service from './browse.service'

export default angular.module('vlcStream.browse', [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .service(service.UID, service)
  .name
