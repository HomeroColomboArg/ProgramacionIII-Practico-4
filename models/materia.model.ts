export class materiaModel {
  constructor(
    private idMateria: number,
    private nombre: string,
    private cuatrimestre: number
  ) {
    this.idMateria = idMateria
    this.nombre = nombre
    this.cuatrimestre = cuatrimestre
  }

  //GET
  public getIdMateria(): number {
    return this.idMateria
  }

  public getNombre(): string {
    return this.nombre
  }

  public getCuatrimestre(): number {
    return this.cuatrimestre
  }

  //SET
  public setNombre(otroNombre: string): void {
    this.nombre = otroNombre
  }

  public setCuatrimestre(otroCuatrimestre: number): void {
    this.cuatrimestre = otroCuatrimestre
  }

  //JSON
  public getAllAttributes(): object {
    return {
      idMateria: this.idMateria,
      nombre: this.nombre,
      cuatrimestre: this.cuatrimestre
    }
  }
}
