import { Router } from 'express'
import apicache from 'apicache'
import { getStreams } from './youtube.controller'

const cache = apicache.options({
  debug: true
}).middleware('1 hour', (req, res) => res.statusCode === 200)

export default Router()
  .get('/', cache, getStreams)
