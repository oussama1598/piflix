import { Router } from 'express'
import Controller from './controls.controller'

export default Router()
  .get('/:command', Controller)
