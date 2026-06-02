import fs from 'fs/promises'
import { ProfesorModel } from '../models/profesor.model';

const DATA_PATH = './data/sys-profesores.json';

// GET ALL PROFESORES
export const getProfesoresAll = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    const profesores = JSON.parse(data);

    return res.status(200).json(profesores);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los datos de los profesores' });
  }
};

// GET PROFESOR BY ID
export const getProfesorById = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    const profesores = JSON.parse(data);

    const { idProfesor } = req.params;

    const profesor = profesores.find(
      (p) => p.idProfesor === Number(idProfesor)
    );

    if (!profesor) {
      return res
        .status(404)
        .json({ msg: `No existe el profesor con el ID ${idProfesor}` });
    }

    return res.status(200).json(profesor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: `No se pudo obtener el detalle del profesor con ID n° ${req.params.idProfesor}`
    });
  }
};

// ADD PROFESOR
export const addProfesor = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    const profesores = JSON.parse(data);

    let profesorInstance;
    try {
      // Instanciamos usando el ProfesorModel que me pasaste al principio
      profesorInstance = new ProfesorModel(
        Number(req.body.idProfesor),
        req.body.nombre,
        req.body.apellido,
        req.body.email,
        req.body.materia
      );
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ msg: 'Los datos enviados no fueron válidos para el modelo Profesor' });
    }

    // Convertimos la instancia a objeto plano para validar y guardar
    const nuevoProfesorObj = profesorInstance.getAllAttributes();

    if (profesores.some((p) => p.idProfesor === nuevoProfesorObj.idProfesor)) {
      return res.status(409).json({
        msg: `Un profesor ya fue registrado con el ID ${nuevoProfesorObj.idProfesor}`
      });
    }

    profesores.push(nuevoProfesorObj);
    
    await fs.writeFile(DATA_PATH, JSON.stringify(profesores, null, 2));
    
    return res.status(201).json({ msg: 'Profesor agregado exitosamente', data: nuevoProfesorObj });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al agregar al profesor' });
  }
};

// UPDATE PROFESOR (Materia)
export const updateProfesor = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    let profesores = JSON.parse(data);

    const { idProfesor } = req.params;
    const { materia } = req.body;

    // Buscamos el profesor existente
    const profesorData = profesores.find(
      (p) => p.idProfesor === Number(idProfesor)
    );

    if (!profesorData) {
      return res
        .status(404)
        .json({ msg: `No existe el profesor con el ID ${idProfesor}` });
    }

    const profesorInstance = new ProfesorModel(
      profesorData.idProfesor,
      profesorData.nombre,
      profesorData.apellido,
      profesorData.email,
      profesorData.materia
    );

    // Modificamos la materia usando el Setter
    profesorInstance.setMateria(materia);

    // Filtramos el viejo y pusheamos el actualizado
    profesores = profesores.filter((p) => p.idProfesor !== Number(idProfesor));
    profesores.push(profesorInstance.getAllAttributes());

    await fs.writeFile(DATA_PATH, JSON.stringify(profesores, null, 2));
    
    return res.status(200).json({ msg: 'Profesor actualizado exitosamente', data: profesorInstance.getAllAttributes() });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al actualizar al profesor' });
  }
};

// DELETE PROFESOR
export const deleteProfesor = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    let profesores = JSON.parse(data);

    const { idProfesor } = req.params;

    const profesor = profesores.find(
      (p) => p.idProfesor === Number(idProfesor)
    );

    if (!profesor) {
      return res
        .status(404)
        .json({ msg: `No existe el profesor con el ID ${idProfesor}` });
    }

    // Removemos al profesor de la lista
    profesores = profesores.filter((p) => p.idProfesor !== Number(idProfesor));
    
    await fs.writeFile(DATA_PATH, JSON.stringify(profesores, null, 2));
    
    return res.status(200).json({ msg: 'Profesor borrado exitosamente' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'Ha habido un error al borrar al profesor' });
  }
};

export default {
  getProfesoresAll,
  getProfesorById,
  addProfesor,
  updateProfesor,
  deleteProfesor
};