import mmm from 'mmmagic'
import {
  extension
} from 'mime-types'
import isVideo from 'is-video'
import audioExtensions from 'audio-extensions'
import audios from '../data/audios'

export const isAudio = ext =>
  audioExtensions.concat(audios).indexOf(ext) > -1

export const checkIfStreamable = path =>
  new Promise(resolve => {
    const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE)
    magic.detectFile(path, (err, mime) => {
      if (err) {
        console.log(err)
        return resolve(false)
      }

      const ext = extension(mime)

      resolve(
        isVideo(`file.${ext}`) ||
        isAudio(ext)
      )
    })
  })
