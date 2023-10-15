import { BaseDto } from '../base.dto';

export class StoreAndCompanyDto extends BaseDto {
  empCodigo: number;
  empNumero: number;
  empNombre: string;
  tieCodigo: number;
  tieNumero: number;
  tieNombre: string;
  tieDomicilio: string;

  constructor(dtoData?: any) {
    super(dtoData);
  }

  get empNameFormatted() {
    return `${this.empCodigo} - ${this.empNombre}`;
  }

  get tieNameFormatted() {
    return `${this.tieCodigo} - ${this.tieNombre}`;
  }
}
