import { Router } from 'express'
import DlnaRouter from './dlna'
import YoutubeRouter from './youtube'

export default Router()
  .use('/dlna', DlnaRouter)
  .use('/youtube', YoutubeRouter)
