//import { VisualModuloDto } from 'src/app/core/models/visual-modules/visual-modulo.dto';
import { BaseDto } from './../base.dto';

export interface ICompanyAndStoreInfo {
  canChangeStore: boolean;
  companyCode: number;
  companyComercialName: string;
  companyName: string;
  companyShortName: string;
  isPortugal: boolean;
  isValidInfo: boolean;
  modoFacturacion: string;
  storeCode: number;
  storeLogo: string;
  storeName: string;
  tpv: number;
}

export interface IListaParametro {
  parKey: string;
  parValor?: string;
  parDescripcio?: string;
  parTipus?: string;
  typeParValor?: number;
}
export interface IListaParametroCont {
  parKey: string;
  parValor: string;
  parDescripcion: string;
  parTipo: string;
}

export interface IParametrosMantenimiento {
  prmTarea: string;
  prmParametro: string;
  prmValor: string;
}

export interface IConfiguration {
  // modulo: VisualModuloDto[];
  listaParametros: IListaParametro[];
  parametrosMantenimiento: IParametrosMantenimiento[];
  listaParametrosCont: IListaParametroCont[];
}

export interface IUserInfo {
  Attributes: string[];
  SessionID: string;
  UserID: string;
  UserData: string;
}

export enum EnumRetryMode {
  Normal = 'Normal',
  Captcha = 'Captcha',
  DoubleFactor = 'DoubleFactor',
  Lock = 'Lock',
}

export class LoginResultDto extends BaseDto {
  accessToken: string;
  AllVisibility: boolean;
  canRetry: boolean;
  cfg: any[];
  companyAndStoreInfo: ICompanyAndStoreInfo;
  canChangeStore: boolean;
  configuration: IConfiguration[];
  dbName: string;
  language: string;
  logbookURL: string;
  passwordDaysToExpire: number;
  passwordExpired: boolean;
  passwordMustChange: boolean;
  remoteLogViewers: any[];
  result: boolean;
  retryMode: EnumRetryMode;
  rolesHash: string;
  signalURL: string;
  superUsr: boolean;
  userCode: string;
  userAvatar: string;
  userFriendlyName: string;
  userInfo: IUserInfo;
}
