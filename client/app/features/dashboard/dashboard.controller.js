import angular from 'angular'
import YtController from './yt-dialog/youtube.controller'

export default class playerController {
  static get UID () {
    return 'dashboardController'
  }

  /* @ngInject */
  constructor ($mdDialog) {
    this.$mdDialog = $mdDialog
  }

  onOpenYoutubeDialog (ev) {
    this.$mdDialog.show({
      controller: YtController,
      controllerAs: 'youtube',
      template: require('./yt-dialog/youtube.tpl.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
  }
}
