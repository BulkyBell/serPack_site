import { HttpHeaders } from '@angular/common/http';
// import { StoreService, AppConfigService } from '@core';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { oDataService } from '@shared';
import { AppConfigService } from '@core';
// import { Store } from 'devextreme/data/abstract_store';
// import ODataContext from "devextreme/data/odata/context";
//import ODataStore from 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';
import { TokenService } from '@core';

@Component({
  templateUrl: 'qry4.component.html',
})

export class Qry4Component { 
  dataSource: any;
  private apiUrl: string;
  private rgtoken: string;

  constructor(private appConfigService: AppConfigService, protected tokenService: TokenService){
    this.apiUrl = this.getApiUrl();
    this.rgtoken = this.tokenService.getToken()!;
    this.dataSource = new DataSource({   
      store: {
        type: 'odata',
        key: 'cbbo_id',
        url: this.apiUrl + 'api_cbodata/cb_basicoffers?$format=JSON',
        withCredentials: false,
        beforeSend: (e) => {
          if ((this.rgtoken != null) && (this.rgtoken.length > 0)) {
            e.headers = {
              "Access-Token": this.rgtoken,
              "Content-Type": 'application/json'
            };
          };
        }
      },
      select: [
        'cbbo_id',        
        'cbbo_reference',
        'dbbo_desc',
        'cbbo_price',
        'cbbo_dateini',
        'cbbo_dateend',
        'cbbo_toendstock',
        // 'cbbo_applytolist',
        // 'cbbo_image',
        'cbbo_creator',
        'cbbo_creation',
        'cbbo_lastedituser',
        'cbbo_lasteditdate'
      ]
    });
  }

  private getApiUrl(): string {
    return this.appConfigService.get('apiUrl');
  }
}
