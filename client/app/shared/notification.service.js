import angular from 'angular'

export class NotificationService {
  /* @ngInject; */
  constructor ($mdToast) {
    this.$mdToast = $mdToast
  }

  show (text) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(text)
        .position('top right')
        .hideDelay(3000)
    )
  }
}

export default angular.module('PiFlix.NotificationService', [])
  .service('NotificationService', NotificationService)
  .name
