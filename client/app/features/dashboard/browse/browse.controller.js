export default class browseController {
  static get UID () {
    return 'browseController'
  }

  /* @ngInject */
  constructor (BrowseService, $rootScope, $stateParams) {
    this.$rootScope = $rootScope
    this.BrowseService = BrowseService
    this.$stateParams = $stateParams

    this.history = []
    this.result = {
      items: []
    }
    this.loading = true
  }

  $onInit () {
    this.$rootScope.$broadcast('backBtn', {
      show: true,
      state: 'dashboard.dlna'
    })

    this.getStructure(0, 20, 1)
  }

  onBrowseTo (file) {
    if (file.isFile) return

    if (file.title !== '..') this.history.push(this.result.path)
    if (file.title === '..') {
      this.getStructure(this.history[ this.history.length - 1 ])
      return this.history.pop()
    }

    this.getStructure(file.path)
  }

  onStream (file) {
    if (!file.isFile) return

    this.$rootScope.$broadcast('play', file.streamUrl)
  }

  getStructure (path, limit, page) {
    this.loading = true
    this.BrowseService.getDirStructure(
      this.$stateParams.uuid,
      path,
      limit,
      page
    )
      .then(data => {
        if (parseInt(data.path) !== 0) {
          data.items.unshift({
            title: '..',
            isFile: false
          })
        }

        this.result = data
        this.loading = false
      })
  }
}
