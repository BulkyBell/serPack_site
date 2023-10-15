export interface IApiField {
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
  groupIndex: number;
  customizeText?: string;
  fieldID: number; // solo para las tablas de consultas
}
