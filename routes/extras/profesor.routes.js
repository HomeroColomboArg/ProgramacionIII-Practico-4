const { Router } = require('express')
const {
  getProfesorAll,
  getProfesorById,
  addProfesor,
  updateProfesor,
  deleteProfesor
} = require('../controllers/profesor.controller')

const rutas = Router()

rutas.get('/profesores', getProfesorAll)
rutas.get('/:idProfesor', getProfesorById)
rutas.post('/profesor', addProfesor)
rutas.put('/:profesor', updateProfesor)
rutas.delete('/:idProfesor', deleteProfesor)

module.exports = rutas