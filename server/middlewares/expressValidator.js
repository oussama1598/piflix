import expressValidator from 'express-validator'
import filesystem from 'fs'
import { promisifyAll } from 'bluebird'

const fs = promisifyAll(filesystem)

export default () => expressValidator({
  customValidators: {
    notDirAndExists: path => fs.statAsync(path)
      .then(stat => stat.isFile() ? true : Promise.reject(new Error('not a file')))
  }
})
