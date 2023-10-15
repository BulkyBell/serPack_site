import { IDecodedApiError } from './../models/decoded-api-error.interface';
import { IApiError } from '@core';
import { Base64 } from 'js-base64';

export class Utils {
  /**
   * Este método permite clonar las propiedades sobre un object
   * @param data Objeto fuente para clonar
   * @returns Nuevo objeto clonado
   */
  static cloneObject<T>(data: any): T {
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Este método permite fusionar las propiedades de dos objetos. En caso de que alguna propiedad se encuentre en ambos, el valor que predominará será el del objeto destino.
   * @param source Objeto fuente para mergear los datos
   * @param dest Objeto destino para mergear los datos
   * @returns Objeto con las propiedades añadidas.
   */
  static mergeObject(source: any, dest: any) {
    return Object.assign(this.cloneObject(source), dest);
  }

  /**
   * Devuelve un número aleatorio entre dos valores
   * @param max Valor máx para generar el número. 999999999 por defecto.
   * @param min Valor min para generar el número. 1 por defecto.
   * @returns Número aleatorio.
   */
  static generateRandomNumber(max: number = 999999999, min: number = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Devuelve un array unificado por una key
   * @param arr Array de datos que queremos unificar
   * @param key Key por la que queremos unificar
   * @returns Nuevo array unificado.
   */
  static getUniqueListBy(arr: any[], key: string) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  /**
   * Convierte un objeto en Base64
   * @param obj Objeto para convertir en Base64
   * @returns String codificado en Base64
   */
  static encodeObjectToBase64(obj: any): string {
    return Base64.encode(JSON.stringify(obj));
  }

  /**
   *
   * @param base64 String en Base64
   * @returns Devuelve un objeto de un tipo (que se infiere o se le pasa)
   */
  static decodeBase64ToObject<T>(base64: string): T {
    return JSON.parse(Base64.decode(base64));
  }

  /**
   *
   * @param error Error, de tipo IApiError o any si se produce un error desconocido.
   * @param errorCode Booleano que controla si se quiere obtener el código de error o el mensaje.
   * @returns Devuelve un string con el mensaje, código de error o el error (no decodificado) que se haya producido.
   */
  static decodeApiError(error: IApiError | any, errorCode: boolean = true): IDecodedApiError {
    const result: IDecodedApiError = { isDecoded: false, isErrorCode: false };
    if (this.isString(error)) {
      result.error = error;
    } else {
      result.isDecoded = true;

      if (errorCode) {
        result.errorCode = error.errorCode;
        result.errorCodeI18n = `errorCodes.${error.errorCode}`;
        result.isErrorCode = true;
        result.error = error.errorMessage;
      } else {
        result.error = error.message;
      }
    }
    return result;
  }

  /**
   *
   * @param obj Objeto a comprobar.
   * @returns Devuelve true/false si el objeto es un string.
   */
  static isString(obj: any) {
    return typeof obj === 'string';
  }

  /**
   *
   * @param obj1 y @param obj2 los objetos a comparar
   * @returns Devuelve true o false dependiendo de si son o no objetos iguales
   */
  static isEqualObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
