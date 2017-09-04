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

  getPreviousPath () {
    if (localStorage.path) return localStorage.path

    return null
  }
}
