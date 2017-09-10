import angular from 'angular'

export class KodiSocketService {
  /* @ngInject; */
  constructor (config) {
    this.config = config
    this.socketURI = `${config.kodiURI.replace('http', 'ws')}/jsonrpc`
    this.socket = new WebSocket(this.socketURI)

    this._init()
  }

  _init () {
    this.socket.onopen = () =>
      (this.socket.onmessage = this._onSocketMessage.bind(this))
  }

  _onSocketMessage (message) {
    console.log(message)
  }
}

export default angular.module('PiFlix.KodiSocketService', [])
  .service('KodiSocketService', KodiSocketService)
  .name
