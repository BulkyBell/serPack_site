// import { StoreService, AppConfigService } from '@core';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { oDataService } from '@shared';
import { AppConfigService } from '@core';

@Component({
  templateUrl: 'qry4.component.html',
})

export class Qry4Component { 
  dataSource: any;
  private apiUrl: string;
  formatMM: ",000 mm";
  formatKG: ",000 kg";

  constructor(private appConfigService: AppConfigService){
    this.apiUrl = this.getApiUrl();
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'UD',
        url: this.apiUrl + 'api_odata/qry4'
      },
      select: [
        'ID',
        'REFERENCE',
        'DESC',
        'PRICE',
        'DATEINI',
        'DATEEND',
        'TOENDSTOCK',
        'APPLYTOLIST',
        'IMAGE',
        'CREATOR',
        'CREATION',
        'LASTEDITUSER',
        'LASTEDITDATE'
      ]
    }
  }

  private getApiUrl(): string {
    return this.appConfigService.get('apiUrl');
  }
}
