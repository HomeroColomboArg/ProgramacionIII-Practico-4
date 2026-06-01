import { PersonaModel } from './persona.model.ts'

export class AlumnoModel extends PersonaModel {
  private legajo: number
  private fechaAlta: Date
  private modificacion: Date
  private isActive: boolean

  constructor(
    legajo: number,
    nombre: string,
    apellido: string,
    email: string,
    fechaAlta: Date,
    modificacion: Date,
    isActive: boolean
  ) {
    super(nombre, apellido, email)
    this.legajo = legajo
    this.fechaAlta = fechaAlta
    this.modificacion = modificacion
    this.isActive = isActive
  }

  //Métodos GET
  public getLegajo(): number {
    return this.legajo
  }

  public getFechaAlta(): Date {
    return this.fechaAlta
  }

  public getModificacion(): Date {
    return this.modificacion
  }

  public getIsActive(): boolean {
    return this.isActive
  }

  //Métodos SET
  public setLegajo(legajo: number): void {
    this.legajo = legajo
  }

  public setFechaAlta(nuevaFecha: Date): void {
    this.fechaAlta = nuevaFecha
  }

  public setModificacion(nuevaModificacion: Date): void {
    this.modificacion = nuevaModificacion
  }

  public setIsActivate(estado: boolean): void {
    this.isActive = estado
  }

  //JSON
  public getAllAttributes(): object {
    return {
      legajo: this.legajo,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}
