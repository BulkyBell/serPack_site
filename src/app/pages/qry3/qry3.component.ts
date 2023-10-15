// import { StoreService } from '@core';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { oDataService } from '@shared';
import { AppConfigService } from '@core';

@Component({
  templateUrl: 'qry3.component.html'
})

export class Qry3Component {
  dataSource: any;
  private apiUrl: string;
  formatMM: ",000 mm";
  formatKG: ",000 kg";

  constructor(private appConfigService: AppConfigService) {
    this.apiUrl = this.getApiUrl();
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'ID',
        url: this.apiUrl + 'api_odata/qry3'
      },
      
      select: [
        'ID',
        'NUMLOTPRO',
        'ARTNOM',
        'FECHACREA',
        'CONSUMIDO',
        'ANCHO',
        'PESOINICIAL',
        'PESOACTUAL'
      ]
    };
  }

  private getApiUrl(): string {
    return this.appConfigService.get('apiUrl');
  }
}
