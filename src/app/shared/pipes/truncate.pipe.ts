import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  //Funcionalidad del pipe
  // Cuando necesitemos que un texto determinado tenga una longitud especifica y podemos indicar que texto es sustuido al final con el ellipsis
  // Ejemplo: str = 'Mi caballo se llama Santiago'
  // {{ str | truncate:25 }} ===> Mi caballo se llama Santi...

  transform(value: string, limit = 30, ellipsis = '...'): string {
    return value.length > limit ? value.slice(0, limit - ellipsis.length) + ellipsis : value;
  }
}
