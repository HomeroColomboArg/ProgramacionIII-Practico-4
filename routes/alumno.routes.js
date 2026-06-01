import { Router } from 'express'

import {
  getAlumnoAll,
  getAlumnoById,
  addAlumno,
  updateAlumno,
  deleteAlumno
} from '../controllers/alumno.controller.js'

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', addAlumno)
rutas.put('/:legajo', updateAlumno)
rutas.delete('/:legajo', deleteAlumno)

export default rutas