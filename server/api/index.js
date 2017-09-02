import { Router } from 'express'
import BrowseRouter from './browse'
import StreamRouter from './stream'

export default Router()
  .use('/browse', BrowseRouter)
  .use('/stream', StreamRouter)
