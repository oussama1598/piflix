import angular from 'angular'
import firebase from 'firebase'

export class UserService {
  constructor () {
    this.ref = firebase.database().ref('users')
  }

  getDetails (uid) {
    return this.ref
      .child(uid)
      .once('value')
      .then(snap => snap.val())
  }
}

export default angular.module('gamePassApp.UserService', [])
  .service('UserService', UserService)
  .name
