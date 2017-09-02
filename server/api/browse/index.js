import { Router } from 'express'
import { getDirStructure } from './browse.controller'

export default Router()
  .get('/', getDirStructure)
