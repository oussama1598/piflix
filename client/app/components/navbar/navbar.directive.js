import controller from './navbar.controller'

export default function navbar () {
  return {
    restrict: 'EA',
    template: require('./navbar.tpl.html'),
    controller: controller.UID,
    controllerAs: 'ctrl'
  }
}
