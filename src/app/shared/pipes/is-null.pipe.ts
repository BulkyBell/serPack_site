import { Pipe, PipeTransform } from '@angular/core';
import { ItiString } from '../utils';

@Pipe({
  name: 'isNull'
})
export class IsNullPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return ItiString.isNullOrWhiteSpace(value);
  }

}
