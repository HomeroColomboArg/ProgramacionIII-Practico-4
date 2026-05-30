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
      (a) => a.legajo === Number(legajo)
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

    let alumnoNew
    try {
      alumnoNew = new AlumnoModel(
        req.body.legajo,
        req.body.nombre,
        req.body.apellido,
        req.body.fechaAlta,
        req.body.modificacion,
        req.body.isActive
      )
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ msg: 'Los datos enviados no fueron validos' })
    }

    if (alumnos.some((a) => a.legajo === alumnoNew.legajo)) {
      return res.status(409).json({
        msg: `Un alumno ya fue registrado con el legajo ${alumnoNew.legajo}`
      })
    }

    alumnos.push(alumnoNew)
    await fs.writeFile('../data/alumnos.json', JSON.stringify(alumnos, null, 2))
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
    let alumnos = JSON.parse(data)

    let alumnoNew
    try {
      alumnoNew = new AlumnoModel(
        req.body.legajo,
        req.body.nombre,
        req.body.apellido,
        req.body.fechaAlta,
        req.body.modificacion,
        req.body.isActive
      )
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ msg: 'Los datos enviados no fueron validos' })
    }

    const { legajo } = req.params

    const alumno = alumnos.find(
      (a) => a.legajo === Number(legajo)
    )

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    alumnos = alumnos.filter((item) => item.legajo !== alumno.legajo)
    alumnos.push(alumnoNew)
    await fs.writeFile('../data/alumnos.json', JSON.stringify(alumnos, null, 2))
    return res.status(200).json({ msg: 'Alumno actualizado exitosamente' })
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al actualizar el alumno' })
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('../data/alumnos.json', 'utf8')
    let alumnos = JSON.parse(data)

    const { legajo } = req.params

    const alumno = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    alumnos = alumnos.filter((item) => item.legajo !== alumno.legajo)
    await fs.writeFile('../data/alumnos.json', JSON.stringify(alumnos, null, 2))
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
