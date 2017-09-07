export default class BrowseService {
  // Define a unique identifier for the SampleService to avoid typo's when including it.
  static get UID () {
    return 'BrowseService'
  }

  /* @ngInject */
  constructor ($http, NotificationService) {
    this.$http = $http
    this.NotificationService = NotificationService
  }

  getDirStructure (uuid, path, limit, page) {
    return this.$http({
      method: 'GET',
      url: '/api/dlna/browse',
      params: {
        uuid,
        path,
        limit,
        page
      }
    })
      .then(res => res.data)
      .catch(res => res.status === 400
        ? Promise.reject(res.data.errors[0])
        : Promise.reject(`${res.statusText} on /api/dlna/browse`)
      )
      .catch(err => this.NotificationService.show(err))
  }
}
