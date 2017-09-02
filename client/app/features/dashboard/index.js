import angular from 'angular'
import uirouter from 'angular-ui-router'

// Import base modules
import routes from './dashboard.routes'

// Import internal modules

export default angular.module('vlcStream.dashboard', [uirouter])
  .config(routes)
  .name
