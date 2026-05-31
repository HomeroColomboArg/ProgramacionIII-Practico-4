export class NotaModel {
  constructor(
    private id: number,
    private legajo: number,
    private idMateria: string,
    private nota: number,
    private fecha: Date
  ) {
    this.id = id
    this.legajo = legajo
    this.idMateria = idMateria
    this.nota = nota
    this.fecha = fecha
  }

  //GET
  public getId(): number {
    return this.id
  }

  public getLegajo(): number {
    return this.legajo
  }

  public getIdMateria(): string {
    return this.idMateria
  }

  public getNota(): number {
    return this.nota
  }

  public getFecha(): Date {
    return this.fecha
  }

  //SET
  public setNota(otraNota: number): void {
    this.nota = otraNota
  }

  public setFecha(otraFecha: Date): void {
    this.fecha = otraFecha
  }

  //JSON
  public getAllAttributes(): object {
    return {
      id: this.id,
      legajo: this.legajo,
      idMateria: this.idMateria,
      nota: this.nota,
      fecha: this.fecha
    }
  }
}
