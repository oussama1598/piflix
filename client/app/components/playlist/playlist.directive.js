import controller from './playlist.controller'

export default function navbar () {
  return {
    restrict: 'EA',
    template: require('./playlist.tpl.html'),
    controller: controller.UID,
    controllerAs: 'playlist'
  }
}
