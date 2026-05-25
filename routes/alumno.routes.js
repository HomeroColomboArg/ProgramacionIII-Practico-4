const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  addAlumno,
  modAlumno,
  deleteAlumno
} = require('../controllers/alumno.controller')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', addAlumno)
rutas.put('/:legajo', modAlumno)
rutas.delete('/:legajo', deleteAlumno)

module.exports = rutas
