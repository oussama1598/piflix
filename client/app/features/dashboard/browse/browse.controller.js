export default class browseController {
  static get UID () {
    return 'browseController'
  }

  /* @ngInject */
  constructor (BrowseService) {
    this.BrowseService = BrowseService
    this.files = []
    this.loading = true
  }

  $onInit () {
    this.getStructure()
  }

  onBrowseTo (file) {
    if (file.isFile) return

    this.getStructure(file.path)
  }

  onStream (file) {
    if (!file.isFile) return

    this.BrowseService.stream(file.path)
  }

  getStructure (path) {
    this.loading = true
    this.BrowseService.getDirStructure(path)
      .then(files => {
        this.files = files.files

        this.loading = false
      })
  }

  openMenu ($mdMenu, ev) {
    $mdMenu.open(ev)
  }
}
