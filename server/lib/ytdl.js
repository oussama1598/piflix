import ytdl from 'youtube-dl'

const supportedFormats = [
  'mp4',
  'm4a'
]

export const getFormats = URI =>
  getInfo(URI)
    .then(data => data.formats.map(format => ({
      id: data.id,
      itag: format.format_id,
      filetype: format.ext,
      resolution: format.format.split(' - ')[1].split(' (')[0],
      url: format.url,
      bitrate: format.abr
    })))
    .then(formats => formats.filter(
      format => supportedFormats.indexOf(format.filetype) > -1 && format.bitrate)
    )

export const getInfo = URI => new Promise((resolve, reject) => {
  ytdl.getInfo(URI, [], {}, (err, info) => {
    if (err) return reject(err)

    resolve(info)
  })
})
