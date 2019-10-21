const express = require('express')
const met = require('./met')
const app = express()

const port = process.env.PORT || 3000

app.get('/', function(req, res) {
  res.send({
    info: 'Bienvenido a la pagina del Museo Metropolitano'
  })
})

app.get('/students/:id', function(req, res) {
  if (req.params.id != 'A01039545') {
    return res.send({
      error: `La informacion para la matricula ${req.params.id} no existe`
    })
  }
  res.send({
    id: req.params.id,
    fullname: 'Luis Daniel Vazquez Peña',
    nickname: 'Daniel',
    age: 21
  })
})

app.get('/met', function(req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Debes enviar el nombre del objeto a buscar'
    })
  }
  met.queryObjects(req.query.search, (error, data) => {
    if (error) {
      return res.send({
        error: error
      })
    } else {
      met.queryObjectID(data.id, (error, info) => {
        if (error) {
          return res.send({
            error: error
          })
        } else {
          res.send({
            searchTerm: req.query.search,
            ...info
          })
        }
      })
    }
  })
})

app.get('*', function(req, res) {
  res.send({
    error: 'Ruta no valida, la unicas rutas validas son /students y /met'
  })
})

app.listen(port, function() { 
  console.log('Up and running!')
})