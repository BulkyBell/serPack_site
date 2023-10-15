import { LoginDto } from './login.dto';
import { BaseDto } from '../base.dto';
import { AppConfigService } from '@core';

export class LoginInfoDto extends BaseDto {
  info: LoginDto;

  constructor(private appConfigService: AppConfigService, dtoData?: any) {
    super(dtoData);
    this.info = new LoginDto(dtoData?.info);
  }

  setCredentials(username: string, password: string, currentCompany: number = 1, currentStore: number = 1): LoginInfoDto {
    this.info.userId = username;
    this.info.name = username;
    this.info.password = password;
    this.info.currentCompany = currentCompany;
    this.info.currentStore = currentStore;
    this.info.ClientScope = this.appConfigService.get('clientScope');
    return this;
  }

  setTextCaptcha(textCaptcha: string): LoginInfoDto {
    this.info.twoLevel = textCaptcha;
    return this;
  }
}
