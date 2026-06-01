const fs = require('fs').promises
//import AlumnoModel from '../models/alumno.model'

const DATA_PATH = './data/alumnos.json'

export const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los datos de los alumnos' })
  }
}

export const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const alumno = alumnos.find((a) => a.legajo === Number(legajo))

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe ningún alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(alumno)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el detalle del alumno con legajo n° ${legajo}`
    })
  }
}

export const addAlumno = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const alumnos = JSON.parse(data)

    if (alumnos.some((a) => a.legajo === req.body.legajo)) {
      return res.status(409).json({
        msg: `Un alumno ya fue registrado con el legajo ${req.body.legajo}`
      })
    }

    // 1. Agregar el nuevo alumno al array
    alumnos.push(req.body)

    // 2. Escribir el array actualizado en el archivo
    await fs.writeFile(DATA_PATH, JSON.stringify(alumnos, null, 2), 'utf8')

    return res.status(201).json({ msg: 'Alumno agregado exitosamente' })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al agregar al alumno' })
  }
}

export const updateAlumno = async (req, res) => {
  try {
    console.log('PARAMS:', req.params)
    console.log('BODY:', req.body)

    const data = await fs.readFile(DATA_PATH, 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const alumno = alumnos.find((a) => a.legajo === Number(legajo))

    console.log('ALUMNO ENCONTRADO:', alumno)

    if (index === -1) {
      return res
        .status(404)
        .json({ msg: `No existe ningún alumno con el legajo ${legajo}` })
    }

    alumno.nombre = req.body.nombre
    alumno.apellido = req.body.apellido

    console.log('ALUMNO MODIFICADO:', alumno)

    await fs.writeFile(DATA_PATH, JSON.stringify(alumnos, null, 2))

    return res.status(200).json({
      msg: 'Alumno actualizado exitosamente'
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      msg: 'Ha habido un error al actualizar al alumno'
    })
  }
}

export const deleteAlumno = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    let alumnos = JSON.parse(data)

    const { legajo } = req.params

    const existe = alumnos.some((a) => a.legajo === Number(legajo))

    if (!existe) {
      return res.status(404).json({
        msg: `No existe ningún alumno con el legajo ${legajo}`
      })
    }

    alumnos = alumnos.filter((a) => a.legajo !== Number(legajo))

    await fs.writeFile(DATA_PATH, JSON.stringify(alumnos, null, 2))

    return res.status(200).json({
      msg: 'Alumno borrado exitosamente'
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Ha habido un error al borrar al alumno',
      error: error.message
    })
  }
}

module.exports = {
  getAlumnoAll,
  getAlumnoById,
  addAlumno,
  updateAlumno,
  deleteAlumno
}
