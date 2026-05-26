const fs = require('fs').promises
import AlumnoModel from '../models/alumno.model'

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('../data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('../data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const alumno = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(alumno)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el datalle del alumno con legajo n° ${legajo}`
    })
  }
}

const addAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('../data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    // Agregar validacion de estructura para el codigo de error 400

    if (alumnos.some((a) => a.legajo === req.body.legajo)) {
      return res.status(409).json({
        msg: `Un alumno ya fue registrado con el legajo ${req.body.legajo}`
      })
    }

    // Cargar req.body en json
    return res.status(201).json({ msg: 'Alumno agregado exitosamente' })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al agregar al alumno' })
  }
}

const updateAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('../data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    // Agregar validacion de estructura para el codigo de error 400

    const { legajo } = req.params

    const alumno = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    // Modificar json segun alumno y req.body
    return res.status(200).json({ msg: 'Alumno actualizado exitosamente' })
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al agregar al alumno' })
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('../data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    if (!alumnos.some((a) => a.legajo === req.params)) {
      return res
        .status(404)
        .json({ msg: `No existe ningun alumno con el legajo ${req.params}` })
    }

    // Borrar alumno segun legajo
    return res.status(200).json({ msg: 'Alumno borrado exitosamente' })
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al borrar al alumno' })
  }
}

module.exports = {
  getAlumnoAll,
  getAlumnoById,
  addAlumno,
  updateAlumno,
  deleteAlumno
}
