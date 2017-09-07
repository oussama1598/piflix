import angular from 'angular'

export class YoutubeService {
  /* @ngInject; */
  constructor ($http) {
    this.$http = $http
  }

  getStreams (url) {
    return this.$http({
      method: 'GET',
      url: '/api/youtube',
      params: {
        url
      }
    }).then(res => res.data)
  }
}

export default angular.module('PiFlix.YoutubeService', [])
  .service('YoutubeService', YoutubeService)
  .name
