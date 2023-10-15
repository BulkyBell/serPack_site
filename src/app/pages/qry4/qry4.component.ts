import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxBulletModule, DxTemplateModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Service } from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  templateUrl: 'qry4.component.html',
  styleUrls: ['qry4.component.scss'],
  providers: [Service],
})
export class Qry4Component {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  dataSource: DataSource;

  collapsed = false;

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  customizeTooltip = (pointsInfo: any) => ({ text: `${parseInt(pointsInfo.originalValue)}%` });
  constructor(service: Service) {
    this.dataSource = service.getDataSource();
  }
}

@NgModule({
  imports: [ 
    BrowserModule,
    DxDataGridModule, 
    DxTemplateModule, 
    DxBulletModule,
  ],
  declarations: [Qry4Component],
  bootstrap: [Qry4Component],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);