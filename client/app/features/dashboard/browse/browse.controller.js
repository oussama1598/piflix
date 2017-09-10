export default class browseController {
  static get UID () {
    return 'browseController'
  }

  /* @ngInject */
  constructor (BrowseService, $rootScope, $stateParams) {
    this.$rootScope = $rootScope
    this.BrowseService = BrowseService
    this.$stateParams = $stateParams

    this.limit = 20
    this.history = []
    this.result = {
      items: []
    }
    this.loading = true
    this.scrollAllowed = true
  }

  $onInit () {
    this.$rootScope.$broadcast('backBtn', {
      show: true,
      state: 'dashboard.dlna'
    })

    this.getStructure(0)
  }

  onBrowseTo (file) {
    if (file.isFile) return

    if (file.title !== '..') this.history.push(this.result.path)
    if (file.title === '..') {
      this.getStructure(this.history[ this.history.length - 1 ])
      return this.history.pop()
    }

    this.getStructure(file.path, 1)
  }

  onStream (file) {
    if (!file.isFile) return

    this.$rootScope.$broadcast('play', file.streamUrl)
  }

  getStructure (path, page = 1) {
    const limit = this.limit

    this.scrollAllowed = false
    this.BrowseService.getDirStructure(
      this.$stateParams.uuid,
      path,
      limit,
      page
    )
      .then(data => {
        if (
          parseInt(data.path) !== 0 &&
          page === 1
        ) {
          data.items.unshift({
            title: '..',
            isFile: false
          })
        }

        if (page === 1) { this.result = data } else {
          this.result.page = data.page
          this.result.items = this.result.items.concat(data.items)
        }

        this.loading = false
        this.scrollAllowed = true
      })
  }

  onThumbError (file) {
    file.thumb = null
  }

  onBottom () {
    if (!this.result.page || !this.scrollAllowed) return

    const nextPage = parseInt(this.result.page) + 1

    if (nextPage <= parseInt(this.result.total_pages)) {
      this.getStructure(this.result.path, nextPage)
    }
  }
}
