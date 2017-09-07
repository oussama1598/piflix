import { Router } from 'express'
import { getDLNAServers, browseDlna } from './dlna.controller'

export default Router()
  .get('/', getDLNAServers)
  .get('/browse', browseDlna)
