import filesystem from 'fs'
import {
  promisifyAll
} from 'bluebird'
import os from 'os'
import path from 'path'
import _ from 'underscore'
import { checkIfStreamable } from './Streamable'

const fs = promisifyAll(filesystem)

export class FileBrowser {
  constructor () {
    this.homeDir = os.homedir()
  }

  getDirStructure (uri = this.homeDir) {
    return fs.statAsync(uri)
      .then(stat => {
        if (stat.isFile()) return Promise.reject(new Error('Only directories can be parsed'))

        return fs.readdirAsync(uri)
      })
      .then(files => Promise.all(
        files.map(file => {
          const filepath = path.join(uri, file)

          return Promise.all([
            fs.statAsync(filepath)
              .then(data => ({
                isFile: data.isFile(),
                size: data.size,
                path: filepath,
                filename: file
              })),
            checkIfStreamable(filepath).then(streamable => ({ streamable }))
          ])
            .then(results => results.reduce((a, b) => Object.assign(a, b)))
        })
      ))
      .then(files => {
        const Files = this._splitFoldersAndFiles(files, true)
        const Folders = this._splitFoldersAndFiles(files, false)

        return Folders.concat(Files)
      })
      .then(files => {
        files.unshift({
          isFile: false,
          size: null,
          path: path.join(uri, '..'),
          filename: '..'
        })
        return {
          path: uri,
          files
        }
      })
  }

  _splitFoldersAndFiles (arr, files) {
    return _.chain(arr)
      .filter(file => files ? file.isFile : !file.isFile)
      .sortBy('filename')
      .value()
  }
}

export default new FileBrowser()
