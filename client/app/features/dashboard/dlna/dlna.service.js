export default class DlnaService {
  // Define a unique identifier for the SampleService to avoid typo's when including it.
  static get UID () {
    return 'DlnaService'
  }

  /* @ngInject */
  constructor ($http) {
    this.$http = $http
  }

  getDevices () {
    return this.$http.get('/api/dlna/')
      .then(res => res.data)
      .catch(res => res.status === 400
        ? Promise.reject(res.data.errors[0])
        : Promise.reject(`${res.statusText} on /api/dlna `)
      )
  }
}
