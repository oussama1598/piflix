// Import Style
import './app.scss'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'
import ngDebounce from 'angular-debounce'
import ngError from 'ng-error'

// Import base modules
import routes from './app.routes'
import run from './app.run'

// Import internal modules
import dashboardModule from './features/dashboard'
import browseModule from './features/dashboard/browse'
import dlnaModule from './features/dashboard/dlna'

// Import internal components
import navbarComponent from './components/navbar'
import playerComponent from './components/player'
import playlistComponent from './components/playlist'

import SocketService from './shared/socket.service'
import NotificationService from './shared/notification.service'
import YoutubeService from './shared/youtube.service'
import KodiSocketService from './shared/kodiSocket.service'

// Import Directives
import ScrollYDirective from './directives/scrolly'

// Import constant
import Constants from './app.constant'

export default angular.module('PiFlix', [
  uiRouter,
  ngMaterial,
  dashboardModule,
  navbarComponent,
  playlistComponent,
  browseModule,
  dlnaModule,
  playerComponent,
  SocketService,
  NotificationService,
  YoutubeService,
  ScrollYDirective,
  KodiSocketService,
  Constants,
  'rt.debounce',
  'ngError'
])
  .config(routes)
  .run(run)
  .name

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['PiFlix'], {
      strictDi: true
    })
  })
