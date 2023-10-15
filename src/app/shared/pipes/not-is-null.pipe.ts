import { ItiString } from './../utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notIsNull'
})
export class NotIsNullPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return !ItiString.isNullOrWhiteSpace(value);
  }

}
