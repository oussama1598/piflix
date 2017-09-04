import angular from 'angular'
import socketIo from 'socket.io-client'

export class SocketService {
  constructor () {
    this.io = socketIo('http://raspberrypi.local:8082')
  }
}

export default angular.module('gamePassApp.SocketService', [])
  .service('SocketService', SocketService)
  .name
