import angular from 'angular'

export class StreamService {
  /* @ngInject; */
  constructor ($http, NotificationService, $rootScope) {
    this.$http = $http
    this.NotificationService = NotificationService
    this.$rootScope = $rootScope
  }

  stream (streamURI, input = 'local') {
    return this.$http.post('/api/stream', {
      input,
      streamURI
    })
      .then(res => res.data)
      .catch(res => this.NotificationService.show(res.data.errors[0]))
  }

  streamAndPlay (streamURI, input) {
    this.stream(streamURI, input).then(data => {
      this.$rootScope.$broadcast('play', data.streamUrl)
    })
  }
}

export default angular.module('gamePassApp.StreamService', [])
  .service('StreamService', StreamService)
  .name
