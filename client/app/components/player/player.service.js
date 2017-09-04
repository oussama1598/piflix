export default class PlayerService {
  // Define a unique identifier for the SampleService to avoid typo's when including it.
  static get UID () {
    return 'PlayerService'
  }

  /* @ngInject */
  constructor ($http) {
    this.$http = $http
    this.serverURI = 'http://raspberrypi.local:8082'
  }

  getStatus () {
    return this.$http.get(`${this.serverURI}/controls/status`)
      .then(res => res.data)
  }

  setVolume (value) {
    return this._request(
      `${this.serverURI}/controls/volume`, { value }
    ).then(res => res.data)
  }

  setPosition (to) {
    return this._request(
      `${this.serverURI}/controls/seek`, { to }
    ).then(res => res.data)
  }

  playPause () {
    return this._request(
      `${this.serverURI}/controls/playpause`
    ).then(res => res.data)
  }

  stop () {
    return this._request(
      `${this.serverURI}/controls/stop`
    ).then(res => res.data)
  }

  play (source) {
    return this._request(
      `${this.serverURI}/controls/play`, { source }
    ).then(res => res.data)
  }

  muteToggle () {
    return this._request(
      `${this.serverURI}/controls/unmutemute`
    ).then(res => res.data)
  }

  _request (url, params = {}) {
    return this.$http({
      method: 'GET',
      url,
      params
    }).then(res => res.data)
      .catch(console.log)
  }
}
