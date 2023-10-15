export class ItiArray {
  // Ordena el array alfabéticamente a raíz de la propiedad que le especifiques
  static sortArrayByProperty(items: any[], property: string = 'text') {
    items?.sort(function (a, b) {
      if (a[property] > b[property]) {
        return 1;
      }
      if (a[property] < b[property]) {
        return -1;
      }
      return 0;
    });
    return items;
  }

  // Elimina elementos repetidos de un array
  static deleteRepeats(array: any[], property: string) {
    let hash = {};
    return array.filter((o) => (hash[o[property]] ? false : (hash[o[property]] = true)));
  }

  // Borrar objetos de un array por una propiedad
  static deleteObjectOfArrayByProperty(array: any[], property: string, value: any) {
    let index = array.findIndex((item: any) => item[property] == value);

    if (index > -1) {
      array.splice(index, 1);
    }
  }

  static groupBy =
    <T>(keys: (keyof T)[]) =>
    (array: T[]): Record<string, T[]> =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = keys.map((key) => obj[key]).join('-');
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {} as Record<string, T[]>);
}
