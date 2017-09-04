import { Router } from 'express'
import BrowseRouter from './browse'
import StreamRouter from './stream'
import YoutubeRouter from './youtube'

export default Router()
  .use('/browse', BrowseRouter)
  .use('/stream', StreamRouter)
  .use('/youtube', YoutubeRouter)
