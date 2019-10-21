const request = require('request')

const queryObjects = (object, callback) => {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${object}`
  
  request({url, json: true}, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      const data = response.body.objectIDs
      if (data.length == 0) {
        callback('No se encontro algun objeto relacionado', undefined)
      } else {
        console.log(data[0])
        callback(undefined, { id: data[0] })
      }
    }
  })
}

const queryObjectID = (id, callback) => {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`

  request({url, json: true}, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      data = response.body
      console.log('resp2 = ' + data)
      const info = {
        artist : data.constituents[0].name,
        title: data.title,
        year: data.objectEndDate,
        technique: data.medium,
        metUrl: data.objectURL
      }
      callback(undefined, info)
    }
  })
}

module.exports = {
  queryObjectID,
  queryObjects
}