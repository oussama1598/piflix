import { Router } from 'express'
import DlnaRouter from './dlna'
import StreamRouter from './stream'
import YoutubeRouter from './youtube'
import ControlsRouter from './controls'

export default Router()
  .use('/dlna', DlnaRouter)
  .use('/stream', StreamRouter)
  .use('/youtube', YoutubeRouter)
  .use('/controls', ControlsRouter)
