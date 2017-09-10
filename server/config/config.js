const path = require('path')

module.exports = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../..`),
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',
  kodiURI: 'http://oussama.local:9090'
}
