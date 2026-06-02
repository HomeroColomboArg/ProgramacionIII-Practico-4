import fs from 'fs/promises'
import { ProfesorModel } from '../models/profesor.model.ts'

const DATA_PATH = './data/sys-profesores.json'

export const getProfesoresAll = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const profesores = JSON.parse(data)

    return res.status(200).json(profesores)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron obtener los datos de los profesores'
    })
  }
}

export const getProfesorById = async (req, res) => {
  const { idProfesor } = req.params

  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const profesores = JSON.parse(data)

    const profesor = profesores.find(
      (p) => p.idProfesor === Number(idProfesor)
    )

    if (!profesor) {
      return res.status(404).json({
        msg: `No existe el profesor con el ID ${idProfesor}`
      })
    }

    return res.status(200).json(profesor)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el detalle del profesor con ID n° ${idProfesor}`
    })
  }
}

export const addProfesor = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const profesores = JSON.parse(data)

    let profesorInstance

    try {
      profesorInstance = new ProfesorModel(
        Number(req.body.idProfesor),
        req.body.nombre,
        req.body.apellido,
        req.body.email,
        req.body.materia
      )
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        msg: 'Los datos enviados no fueron válidos para el modelo Profesor'
      })
    }

    const nuevoProfesorObj = profesorInstance.getAllAttributes()

    if (profesores.some((p) => p.idProfesor === nuevoProfesorObj.idProfesor)) {
      return res.status(409).json({
        msg: `Un profesor ya fue registrado con el ID ${nuevoProfesorObj.idProfesor}`
      })
    }

    profesores.push(nuevoProfesorObj)
    await fs.writeFile(DATA_PATH, JSON.stringify(profesores, null, 2))

    return res.status(201).json({
      msg: 'Profesor agregado exitosamente',
      data: nuevoProfesorObj
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ha habido un error al agregar al profesor'
    })
  }
}

export const updateProfesor = async (req, res) => {
  const { idProfesor } = req.params

  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    const profesores = JSON.parse(data)

    const index = profesores.findIndex(
      (p) => p.idProfesor === Number(idProfesor)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el profesor con el ID ${idProfesor}`
      })
    }

    profesores[index] = {
      ...profesores[index],
      ...req.body,
      idProfesor: Number(idProfesor)
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(profesores, null, 2))

    return res.status(200).json({
      msg: 'Profesor actualizado exitosamente',
      data: profesores[index]
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ha habido un error al actualizar al profesor'
    })
  }
}

export const deleteProfesor = async (req, res) => {
  const { idProfesor } = req.params

  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    let profesores = JSON.parse(data)

    const profesor = profesores.find(
      (p) => p.idProfesor === Number(idProfesor)
    )

    if (!profesor) {
      return res.status(404).json({
        msg: `No existe el profesor con el ID ${idProfesor}`
      })
    }

    profesores = profesores.filter(
      (p) => p.idProfesor !== Number(idProfesor)
    )

    await fs.writeFile(DATA_PATH, JSON.stringify(profesores, null, 2))

    return res.status(200).json({
      msg: 'Profesor borrado exitosamente'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ha habido un error al borrar al profesor'
    })
  }
}