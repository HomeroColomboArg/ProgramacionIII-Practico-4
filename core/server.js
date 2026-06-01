const express = require('express')
const cors = require('cors')
require('dotenv').config()

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000

    this.middleware()
    this.rutas()
  }

  middleware () {
    this.app.use(cors())

    // 🔥 ESTO ES LO QUE TE FALTABA (CRÍTICO)
    this.app.use(express.json())
  }

  rutas () {
    this.app.use('/alumnos', require('../routes/alumno.routes'))
    /*
    this.app.use('/materias', require('../routes/extra/materia.routes'))
    this.app.use('/notas', require('../routes/extra/nota.routes'))
    this.app.use('/profesores', require('../routes/extra/profesor.routes'))
    */

    // 🔥 404 - SI NO ENCUENTRA RUTA
    this.app.use((req, res) => {
      return res.status(404).json({ msg: 'Ruta no encontrada' })
    })

    // 🔥 ERROR HANDLER (OBLIGATORIO CON 4 PARAMETROS)
    this.app.use((err, req, res, next) => {
      console.error(err.stack)
      return res.status(500).json({ msg: 'Internal Server Error' })
    })
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`La API está escuchando en el puerto: ${this.port}`)
    })
  }
}

module.exports = Server