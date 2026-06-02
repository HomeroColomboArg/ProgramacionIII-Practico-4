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
    this.app.use(express.json())
  }

  rutas () {
    const alumnoRoutes = require('../routes/alumno.routes')
    const profesorRoutes = require('../routes/extras/profesor.routes')

    this.app.use('/alumnos', alumnoRoutes.default || alumnoRoutes)
    this.app.use('/profesores', profesorRoutes.default || profesorRoutes)

    /*
    const materiaRoutes = require('../routes/extra/materia.routes')
    const notaRoutes = require('../routes/extra/nota.routes')

    this.app.use('/materias', materiaRoutes.default || materiaRoutes)
    this.app.use('/notas', notaRoutes.default || notaRoutes)
    */

    this.app.use((req, res, next) => {
      return res.status(404).json({
        msg: 'Error. Pagina no encontrada'
      })
    })

    this.app.use((err, req, res, next) => {
      console.error(err.stack)

      return res.status(500).json({
        msg: 'Internal Server Error'
      })
    })
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`La API esta escuchando el puerto: ${this.port}`)
    })
  }
}

module.exports = Server