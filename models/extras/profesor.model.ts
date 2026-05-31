import { PersonaModel } from '../persona.model'

export class ProfesorModel extends PersonaModel {
  private idProfesor: number
  private materia: string

  constructor(
    idProfesor: number,
    nombre: string,
    apellido: string,
    email: string,
    materia: string
  ) {
    super(nombre, apellido, email)
    this.idProfesor = idProfesor
    this.materia = materia
  }

  //GET
  public getIdProfesor(): number {
    return this.idProfesor
  }

  public getMateria(): string {
    return this.materia
  }

  //SET

  public setMateria(otraMateria: string): void {
    this.materia = otraMateria
  }

  //JSON
  public getAllAttributes(): object {
    return {
      idProfesor: this.idProfesor,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      materia: this.materia
    }
  }
}
