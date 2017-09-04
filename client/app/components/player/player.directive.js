import controller from './player.controller'

export default () => {
  return {
    restrict: 'EA',
    template: require('./player.tpl.html'),
    controller: controller.UID,
    controllerAs: 'player'
  }
}
