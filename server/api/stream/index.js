import { Router } from 'express'
import { stream, streamFile, getStreams } from './stream.controller'

export default Router()
  .post('/', stream)
  .get('/:id', streamFile)
  .get('/', getStreams)
