import { BaseDto } from '../base.dto';

export class LoginDto extends BaseDto {
  master: string;
  osUsername: string;
  domain: string;
  machineName: string;
  mac: string;
  ip: string;
  name: string;
  userId: string;
  password: string;
  idMachine: string;
  reconect: boolean;
  stamp: string;
  timeZoneId: string;
  app: string;
  twoLevel: string;
  currentCompany: number;
  currentStore: number;
  dbConnectionName: string;
  ClientScope: number = 2;

  constructor(dtoData?: any) {
    super(dtoData);
  }

  defaultValues() {
    this.reconect = false;
  }
}
