import angular from 'angular'
import socketIo from 'socket.io-client'

export class SocketService {
  constructor () {
    this.io = socketIo()
  }
}

export default angular.module('PiFlix.SocketService', [])
  .service('SocketService', SocketService)
  .name
