import fs from 'fs/promises'
import { AlumnoModel } from '../models/alumno.model.ts'

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
  const { legajo } = req.params

  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const alumnos = JSON.parse(data)

    const alumno = alumnos.find((a) => a.legajo === Number(legajo))

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
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

    let alumnoNew
    try {
      alumnoNew = new AlumnoModel(
        req.body.legajo,
        req.body.nombre,
        req.body.apellido,
        req.body.email,
        req.body.fechaAlta,
        req.body.modificacion,
        req.body.isActive
      )
    } catch (error) {
      console.log(error)
      return res.status(400).json({ msg: 'Los datos enviados no fueron válidos' })
    }

    if (alumnos.some((a) => a.legajo === alumnoNew.getLegajo())) {
      return res.status(409).json({
        msg: `Un alumno ya fue registrado con el legajo ${alumnoNew.getLegajo()}`
      })
    }

    alumnos.push(alumnoNew.getAllAttributes())
    await fs.writeFile(DATA_PATH, JSON.stringify(alumnos, null, 2))

    return res.status(201).json({ msg: 'Alumno agregado exitosamente' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Ha habido un error al agregar al alumno' })
  }
}

export const updateAlumno = async (req, res) => {
  const { legajo } = req.params

  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex((a) => a.legajo === Number(legajo))

    if (index === -1) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    alumnos[index] = {
      ...alumnos[index],
      ...req.body,
      legajo: Number(legajo)
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(alumnos, null, 2))

    return res.status(200).json({ msg: 'Alumno actualizado exitosamente' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Ha habido un error al actualizar el alumno' })
  }
}

export const deleteAlumno = async (req, res) => {
  const { legajo } = req.params

  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    let alumnos = JSON.parse(data)

    const alumno = alumnos.find((a) => a.legajo === Number(legajo))

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    alumnos = alumnos.filter((item) => item.legajo !== Number(legajo))
    await fs.writeFile(DATA_PATH, JSON.stringify(alumnos, null, 2))

    return res.status(200).json({ msg: 'Alumno borrado exitosamente' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Ha habido un error al borrar al alumno' })
  }
}