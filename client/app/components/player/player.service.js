export default class PlayerService {
  // Define a unique identifier for the SampleService to avoid typo's when including it.
  static get UID () {
    return 'PlayerService'
  }

  /* @ngInject */
  constructor ($http, NotificationService) {
    this.$http = $http
    this.NotificationService = NotificationService
  }

  getStatus () {
    return this.$http.get('status')
      .then(res => res.data)
  }

  setVolume (value) {
    return this._request(
      'volume', { value }
    ).then(res => res.data)
  }

  setPosition (to) {
    return this._request(
      'seek', { to }
    ).then(res => res.data)
  }

  playPause () {
    return this._request('playpause')
      .then(res => res.data)
  }

  stop () {
    return this._request('stop')
      .then(res => res.data)
  }

  play (source) {
    return this._request(
      'play', { source }
    ).then(res => res.data)
  }

  muteToggle () {
    return this._request('unmutemute')
      .then(res => res.data)
  }

  _request (endpoint, params = {}) {
    return this.$http({
      method: 'GET',
      url: `/api/controls/${endpoint}`,
      params
    }).then(res => res.data)
      .catch(res => res.status === 400
        ? Promise.reject(res.data.errors[0])
        : Promise.reject(`${res.statusText} on /api/controls/${endpoint}`)
      ).catch(err => this.NotificationService.show(err))
  }
}
