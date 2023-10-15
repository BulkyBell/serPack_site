import { Injectable } from '@angular/core';
// import { AlertsService, I18nService } from '@shared';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig;

  constructor(){}//private i18nService: I18nService, protected alertsService: AlertsService) {}

  async loadAppConfig() {
    const data = await fetch('assets/app-config.json');
    if (data.ok) {
      try {
        this.appConfig = await data.json();
      } catch (error) {
        // this.i18nService.onLangChange.subscribe((translation) => {
        //   this.alertsService.confirmOneButtonOK(translation?.translations?.errorParsingConfiguration, 'error');
        // });
      }
    } else {
      this.appConfig = {};
    }
  }

  get(key: string) {
    return this.appConfig?.hasOwnProperty(key) ? this.appConfig[key] : environment[key];
  }
}
