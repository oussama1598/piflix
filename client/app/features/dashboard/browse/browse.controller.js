export default class browseController {
  static get UID () {
    return 'browseController'
  }

  /* @ngInject */
  constructor (BrowseService, $rootScope, StreamService) {
    this.$rootScope = $rootScope
    this.BrowseService = BrowseService
    this.StreamService = StreamService
    this.files = []
    this.loading = true
  }

  $onInit () {
    this.getStructure(
      this.BrowseService.getPreviousPath()
    )
  }

  onBrowseTo (file) {
    if (file.isFile) return

    this.getStructure(file.path)
  }

  onStream (file) {
    if (!file.isFile) return

    this.StreamService.streamAndPlay(file.path, 'local')
  }

  getStructure (path) {
    this.loading = true
    this.BrowseService.getDirStructure(path)
      .then(files => {
        this.files = files.files
        localStorage.path = files.path

        this.loading = false
      })
  }
}
