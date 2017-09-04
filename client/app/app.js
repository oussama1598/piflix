// Import Style
import './app.scss'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'
import ngDebounce from 'angular-debounce'

// Import base modules
import routes from './app.routes'
import run from './app.run'

// Import internal modules
import dashboardModule from './features/dashboard'
import browseModule from './features/dashboard/browse'

// Import internal components
import navbarComponent from './components/navbar'
import playerComponent from './components/player'

import SocketService from './shared/socket.service'
import NotificationService from './shared/notification.service'
import YoutubeService from './shared/youtube.service'
import StreamService from './shared/stream.service'

export default angular.module('vlcStream', [
  uiRouter,
  ngMaterial,
  dashboardModule,
  navbarComponent,
  browseModule,
  playerComponent,
  SocketService,
  NotificationService,
  YoutubeService,
  StreamService,
  'rt.debounce'
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
