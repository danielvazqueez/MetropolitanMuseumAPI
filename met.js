const request = require('request')

const queryObjects = (object, callback) => {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${object}`
  
  request({url, json: true}, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      console.log(response)
      const data = response.objectIDs
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
      console.log('resp2 = ' + response)
      const info = {
        artist : response.constituents[0].name,
        title: response.title,
        year: response.objectEndDate,
        technique: response.medium,
        metUrl: response.objectURL
      }
      callback(undefined, info)
    }
  })
}