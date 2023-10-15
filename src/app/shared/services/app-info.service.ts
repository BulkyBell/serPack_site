import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Serpack, S.L. - runGES portal';
  }

  public get rightsCompany() {
    return 'runIT development, S.L.'
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
