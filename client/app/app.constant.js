import angular from 'angular'

export default angular.module('PiFlix.constants', [])
  .constant('config', require('../../server/config/config'))
  .name
