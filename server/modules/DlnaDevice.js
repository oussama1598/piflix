import request from 'request-promise'
import { parseString } from 'xml2js'
import url from 'url'
import EventEmitter from 'events'
import xmlBuilder from 'xmlbuilder'
import _ from 'underscore'

export default class DlnaDevice extends EventEmitter {
  constructor (_uri, _uuid) {
    super()

    this.uri = _uri
    this.uuid = _uuid
    this.deviceDetails = null
    this.browseSchema = '"urn:schemas-upnp-org:service:ContentDirectory:1#Browse"'

    this._getDeviceDetails()
      .then(deviceDetails => {
        this.deviceDetails = deviceDetails
        this.emit('ready', deviceDetails)

        this._watchDevice()
      })
      .catch(err => {
        console.log(err)
        this.emit('remove', this.uuid)
      })
  }

  heartBeat () {
    clearTimeout(this.watchDevice)

    this._watchDevice()
  }

  browse (path = 0, _limit = 20, _page = 1) {
    const page = _page || 1
    const limit = _limit || 1

    return this._requestDirStructure(path, limit, page)
  }

  _watchDevice () {
    this.watchDevice = setTimeout(() => {
      this.emit('remove', this.uuid)
    }, 10000)
  }

  _parseXMLPromise (body) {
    return new Promise((resolve, reject) => {
      parseString(body, (err, result) => {
        if (err) reject(err)

        resolve(result)
      })
    })
  }

  _getDeviceDetails () {
    const uri = this.uri

    return request({
      uri
    })
      .then(this._parseXMLPromise)
      .then(data => {
        const uriDetails = url.parse(uri)
        const host = `${uriDetails.protocol}//${uriDetails.host}`
        const deviceData = data.root.device[0]
        const uuid = deviceData.UDN[0]
        const name = deviceData.friendlyName[0]
        const iconUrl = `${host}${deviceData.iconList[0].icon[0].url[0]}`
        const contentControlUrl = deviceData.serviceList[0].service
          .filter(service =>
            service.serviceType[0] === 'urn:schemas-upnp-org:service:ContentDirectory:1'
          )

        if (!contentControlUrl[0]) {
          return Promise.reject(
            new Error(`ContentDirectory service not found on this device ${name}`)
          )
        }

        return {
          uuid,
          uri,
          name,
          iconUrl,
          contentControlUrl: `${host}${contentControlUrl[0].controlURL[0]}`
        }
      })
  }

  _buildReqXml (path, startingIndex = 0, limit) {
    return xmlBuilder.create('s:Envelope', { version: '1.0', encoding: 'utf-8' })
      .att('s:encodingStyle', 'http://schemas.xmlrequestXml.org/requestXml/encoding/')
      .att('xmlns:s', 'http://schemas.xmlrequestXml.org/requestXml/envelope/')
      .ele('s:Body')
      .ele('u:Browse', {
        'xmlns:u': 'urn:schemas-upnp-org:service:ContentDirectory:1'
      })
      .ele('ObjectID', path)
      .up().ele('BrowseFlag', 'BrowseDirectChildren')
      .up().ele('Filter', '*')
      .up().ele('StartingIndex', startingIndex)
      .up().ele('RequestedCount', limit)
      .up().ele('SortCriteria', '')
      .doc().end()
  }

  _requestDirStructure (path, _limit, _page) {
    const page = parseInt(_page)
    const limit = parseInt(_limit)

    return request({
      method: 'POST',
      uri: this.deviceDetails.contentControlUrl,
      body: this._buildReqXml(path, limit * (page - 1), limit),
      headers: {
        'SOAPACTION': this.browseSchema,
        'Content-Type': 'text/xml'
      }
    })
      .then(this._parseXMLPromise)
      .then(result => result['s:Envelope']['s:Body'][0]['u:BrowseResponse'][0])
      .then(result =>
        this._parseXMLPromise(result.Result[0])
          .then(items => ({
            totalItems: parseInt(result.TotalMatches[0]),
            returnedItems: parseInt(result.NumberReturned[0]),
            result: items['DIDL-Lite']
          }))
      )
      .then(({ totalItems, returnedItems, result }) => ({
        page,
        total_pages: Math.ceil(totalItems / limit),
        total_items: totalItems,
        returned_items: returnedItems,
        path,
        items: [].concat(
          result.container
            ? this._parseResult(result.container)
            : [],
          result.item
            ? this._parseResult(result.item)
            : []
        )
      }))
      .catch(err => {
        console.log(err.statusCode)
        return Promise.reject(new Error('Something went wrong'))
      })
  }

  _parseResult (result) {
    return _.chain(result).map(item => {
      const itemData = {
        path: item.$.id,
        type: item['upnp:class'][0],
        title: item['dc:title'][0],
        isFile: item['upnp:class'][0] !== 'object.container'
      }

      if (item.res) {
        if (item.res[0]) itemData['streamUrl'] = item.res[0]._
        if (item.res[1]) itemData['thumb'] = item.res[1]._
      }

      return itemData
    }).sortBy('title').value()
  }
}
