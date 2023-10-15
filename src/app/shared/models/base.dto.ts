import 'reflect-metadata';

import { IBaseDto, IBaseDtoData } from './base-dto.interface';

export class BaseDto implements IBaseDto {
  private __loaded = false;
  __isProxy: boolean;

  constructor(dtoData?: any | IBaseDtoData) {
    const { src = dtoData, defaultValues = true } = dtoData || {};

    if (!src?.hasOwnProperty('src') && src) {
      this.copy(src);
    } else if (defaultValues) {
      this.defaultValues();
    }
  }

  isBaseDto(): boolean {
    return true;
  }

  copy(src?: any) {
    if (src) {
      Object.assign(this, src);
    }
  }

  get loaded() {
    return this.__loaded;
  }

  set loaded(value: boolean) {
    this.__loaded = value;
  }

  get fields() {
    let fields = [];
    let target = Object.getPrototypeOf(this);
    while (target != Object.prototype) {
      let childFields = Reflect.getOwnMetadata('fields', target) || [];
      fields.push(...childFields);
      target = Object.getPrototypeOf(target);
    }
    return fields;
  }

  // Método que redefinirán las clases hijas para indicar valores por defecto cuando se crea una nueva instancia
  protected defaultValues() {}
}
