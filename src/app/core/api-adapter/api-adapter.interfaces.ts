import { Type } from '@angular/core';

import { IBaseDto } from '../../shared/models/base-dto.interface';
import { IApiField } from '../models';

export interface IApiAdapterMapping {
  apiEntityName: string;
  classDto: Type<IBaseDto>;
  modelDtoName?: string;
}

export interface IApiGetDataField {
  blobType: string;
  calculated: boolean;
  dataType: string;
  decimalPrecision: number;
  decimalScale: number;
  defaultValue: string;
  displayLabel: string;
  displayWidth: number;
  inPrimaryKey: boolean;
  name: string;
  readOnly: boolean;
  required: boolean;
  visible: boolean;
  size: number;
  customizeText?: any;
  fieldID: number; // solo para las tablas de consultas
}

export interface IApiGetData {
  name: string;
  totalRecordCount: number;
  fields?: IApiField[];
  rows: any[];
  
  queryID: number;
}

export interface IApiListData {
  data: any[];
  totalCount: number;
  [propName: string]: any;
}
