// Import Style
import './app.scss'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'

// Import base modules
import routes from './app.routes'
import run from './app.run'

// Import internal modules
import dashboardModule from './features/dashboard'
import browseModule from './features/dashboard/browse'

// Import internal components
import navbarComponent from './components/navbar'

// Import Services
// import UserService from './shared/user.service'

export default angular.module('vlcStream', [
  uiRouter,
  ngMaterial,
  dashboardModule,
  navbarComponent,
  browseModule
])
  .config(routes)
  .run(run)
  .name

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['vlcStream'], {
      strictDi: true
    })
  })
