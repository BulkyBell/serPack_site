import { ItiString } from 'src/app/shared/utils';

import { apiAdapterMapping, IApiAdapterMapping, IApiCreate } from '.';

// Para hacer insert o updates de entidades con Dtos anidados (p.e. un maestro-detalle)
// En Angular tendremos clases Dto con la anidación, pero en el API se esperan arrays separados
// para cada entidad.
// Este servicio contiene la lógica para transformar desde Dtos anidados hacia los arrays separados
// que espera el API.

const dtoData = (data: any, defaultValues: boolean) => {
  return {
    src: data,
    defaultValues: !data && defaultValues,
  };
};

export class ApiAdapter {
  static createDto({ apiEntityName, data = undefined, defaultValues }: IApiCreate) {
    const adapterMapping = ApiAdapter.getAdapterMapping(apiEntityName);
    if (adapterMapping != null && adapterMapping.classDto != null) {
      const classDto = adapterMapping.classDto;
      if (data != null && data instanceof Array) {
        return data;
      } else {
        return new classDto(dtoData(data, defaultValues));
      }
    }

    return data;
  }

  static addAdapterMapping(adapterMapping: IApiAdapterMapping) {
    if (ItiString.isNullOrWhiteSpace(adapterMapping.modelDtoName)) {
      adapterMapping.modelDtoName = adapterMapping.classDto.name;
    }
    apiAdapterMapping.push(adapterMapping);
  }

  static getAdapterMapping(apiEntityName: string) {
    return apiAdapterMapping.find((x) => x.apiEntityName === apiEntityName);
  }

  // Para alta y modificación de una entidad se debe enviar al endpoint /api/entity
  // en su Body la estructura definida en el interfaz IApiPostEntity
  // Este método compone la estructura a indicar en el Body de la petición
  // static composeBody({
  //   newdata = {},
  //   olddata = {},
  //   deltaMode = ApiDeltaMode.default,
  //   signedHash = undefined,
  //   requeryEndpoints = undefined,
  // }: {
  //   newdata?: any;
  //   olddata?: any;
  //   deltaMode?: ApiDeltaMode;
  //   signedHash?: string;
  //   requeryEndpoints?: string[];
  // }) {
  //   return {
  //     deltaMode: deltaMode,
  //     signedHash: !ItiString.isNullOrWhiteSpace(signedHash) ? signedHash : undefined,
  //     requeryEndpoints: requeryEndpoints?.length > 0 ? requeryEndpoints : undefined,
  //     newdata: ApiAdapter.cloneObject(newdata),
  //     olddata: ApiAdapter.cloneObject(olddata),
  //   };
  // }

  // Este método permite clonar las propiedades sobre un object
  static cloneObject<T>(data: any, useReplacer: boolean = true): T {
    if (useReplacer) {
      return JSON.parse(JSON.stringify(data, this.replacer));
    } else {
      return JSON.parse(JSON.stringify(data));
    }
  }

  static getApiEntityName(modelDtoName: string): string {
    const adapterMapping = apiAdapterMapping.find((x) => x.modelDtoName === modelDtoName);
    return adapterMapping != null ? adapterMapping.apiEntityName : null;
  }

  // Para poder obtener un servicio en los dto se añade el injector con Appinjector.getInjector()
  // pero al hacer el cloneObject se intenta parsear esta propiedad y da error. Con esta función
  // se omite el parseo.
  private static replacer(key: string, value: any) {
    if (key.startsWith('__') || key.startsWith('req__')) return undefined;
    else return value;
  }
}
