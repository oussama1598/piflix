export default class BrowseService {
  // Define a unique identifier for the SampleService to avoid typo's when including it.
  static get UID () {
    return 'BrowseService'
  }

  /* @ngInject */
  constructor ($http) {
    this.$http = $http
  }

  getDirStructure (path) {
    return this.$http({
      method: 'GET',
      url: '/api/browse',
      params: {
        path
      }
    }).then(res => res.data)
  }

  stream (path) {
    return this.$http.post('/api/stream', {
      path
    }).then(res => res.data)
  }
}
