import expressValidator from 'express-validator'

export default () => expressValidator({
  customValidators: {
    isYoutubeUrl: url =>
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(url)
  }
})
