import { Router } from 'express'
import {
  getProfesorAll,
  getProfesorById,
  addProfesor,
  updateProfesor,
  deleteProfesor
} from '../../controllers/profesor.controller.js'

const rutas = Router()

rutas.get('/', getProfesorAll)
rutas.get('/:idProfesor', getProfesorById)
rutas.post('/', addProfesor)
rutas.put('/:idProfesor', updateProfesor)
rutas.delete('/:idProfesor', deleteProfesor)

export default rutas