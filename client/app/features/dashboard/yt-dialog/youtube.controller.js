export default class youtubeController {
  /* @ngInject */
  constructor ($mdDialog, NotificationService, YoutubeService, $rootScope, StreamService) {
    this.$mdDialog = $mdDialog
    this.NotificationService = NotificationService
    this.YoutubeService = YoutubeService
    this.$rootScope = $rootScope
    this.StreamService = StreamService
    this.loading = false
  }

  onFormSubmited () {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
    const match = this.url.match(regExp)

    if (match && match[2].length === 11) {
      this.loading = true
      return this.YoutubeService.getStreams(this.url)
        .then(streams => {
          this.loading = false
          this.formats = streams
        })
        .catch(err => this.NotificationService.show(err.data.errors[0]))
    }

    this.NotificationService.show(`${this.url} this is not a youtube url`)
  }

  onCast (streamUrl) {
    this.StreamService.streamAndPlay(streamUrl, 'internet')
  }

  cancel () {
    this.$mdDialog.cancel()
  }
}
