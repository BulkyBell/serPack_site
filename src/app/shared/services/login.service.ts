import { EventEmitter, Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import {keyAppInitParams, keyLoginResult, stringRoutes, Utils } from '@shared';
import { CacheService, HttpService, TokenService, AppConfigService } from '../../core';
import { ApiAdapter } from '../../core/api-adapter';

import { api } from '../api';
import { EnumRetryMode, ICompanyAndStoreInfo, LoginInfoDto, LoginResultDto, StoreAndCompanyDto } from '../models';
import { ItiString } from '../utils/strings';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginDto: LoginInfoDto = null;
  loginResultDto: LoginResultDto = null;
  loginChange: EventEmitter<LoginResultDto> = new EventEmitter<LoginResultDto>();
  changeStore: EventEmitter<ICompanyAndStoreInfo> = new EventEmitter<ICompanyAndStoreInfo>();

  constructor(
    protected http: HttpService,
    protected tokenService: TokenService,
    protected cacheService: CacheService,
    protected appConfigService: AppConfigService,
    // protected permissionService: PermissionService,
    protected router: Router,
    // protected i18nService: I18nService,
    // protected signalRService: SignalRService,
    // protected notificationsService: NotificationsService,
    // protected signalRClockService: SignalRClockService,
    // protected configurationService: ConfigurationService,
    // protected alertsService: AlertsService,
    // protected visualModulesService: VisualModulesService,
  ) {
    if (this.tokenService.hasToken()) {
      this.loadLoginResultFromCache();
    }
  }

  get logged(): boolean {
    return this.loginResultDto && !this.loginResultDto.result;
  }

  get loginMessage() {
    return this.logged &&
      this.loginResultDto.userInfo &&
      this.loginResultDto.userInfo.Attributes &&
      this.loginResultDto.userInfo.Attributes.length > 0
      ? this.loginResultDto.userInfo.Attributes[0]
      : null;
  }

  get retryMode(): EnumRetryMode {
    return this.loginResultDto ? this.loginResultDto.retryMode : null;
  }

  get imageCaptcha(): string {
    return this.logged &&
      this.loginResultDto.retryMode === EnumRetryMode.Captcha &&
      this.loginResultDto.userInfo &&
      !ItiString.isNullOrWhiteSpace(this.loginResultDto.userInfo.UserData)
      ? this.loginResultDto.userInfo.UserData
      : null;
  }

  get passwordExpired(): boolean {
    return this.loginResultDto ? this.loginResultDto.passwordExpired : null;
  }

  get passwordMustChange(): boolean {
    return this.loginResultDto ? this.loginResultDto.passwordMustChange : null;
  }

  get passwordDaysToExpire(): number {
    return this.loginResultDto ? this.loginResultDto.passwordDaysToExpire : null;
  }

  get empCodigo() {
    return this.loginResultDto.companyAndStoreInfo.companyCode;
  }

  get empNombre() {
    return this.loginResultDto.companyAndStoreInfo.companyComercialName;
  }

  get tieCodigo() {
    return this.loginResultDto.companyAndStoreInfo.storeCode;
  }

  get tieNombre() {
    return this.loginResultDto.companyAndStoreInfo.storeName;
  }
  get tieLogo() {
    return this.loginResultDto?.companyAndStoreInfo?.storeLogo;
  }
  get dbName() {
    return this.loginResultDto.dbName;
  }
  get userName() {
    return this.loginResultDto?.userInfo?.UserID;
  }
  get userAvatar() {
    return this.loginResultDto?.userAvatar;
  }
  get modoFacturacion() {
    return this.loginResultDto.companyAndStoreInfo.modoFacturacion;
  }
  get isPortugal() {
    return this.loginResultDto.companyAndStoreInfo.isPortugal;
  }

  get perCodigo() {
    return this.loginResultDto.userCode;
  }

  get canChangeStore() {
    return this.loginResultDto.companyAndStoreInfo.canChangeStore;
  }

  get hasDefaultStore() {
    return this.loginResultDto.companyAndStoreInfo.storeCode > 0;
  }

  get requireStoreSelection() {
    return !this.hasDefaultStore && this.canChangeStore;
  }

  get tpvCode() {
    return this.loginResultDto.companyAndStoreInfo.tpv;
  }

  /*get userAvatar() {
    return atob(this.loginResultDto.userAvatar);
  }*/

  public login(userId: string, password: string, textCaptcha: string): Promise<boolean> {
    // Nos aseguramos que la llamada a login no incluya el token en las Headers
    this.tokenService.clearToken();
    this.loginDto = new LoginInfoDto(this.appConfigService).setCredentials(userId, password).setTextCaptcha(textCaptcha);
    const json = ApiAdapter.cloneObject(this.loginDto);
    const queryParams = this.getFormattedAppInitQueryParams();
    return this.http.post(`${api.login}${queryParams}`, json).then(this.onLoginResponse.bind(this));
  }

  async logout(remoteLogout: boolean = true) {
    if (remoteLogout) {
      await this.tryLogoff();
    }
    this.loginDto = null;
    this.setLoginResult(null);
    this.tokenService.clearToken();
    // this.permissionService.reset();
    // this.notificationsService.clearNotifications();
    this.http.clearErrMessages();
    this.signalRDisconnect();
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([stringRoutes.login], { queryParams: this.getStoredAppInitQueryParams() });
  }

  refreshCaptcha(userId: string) {
    const url = ItiString.format(api.refreshCaptcha, userId);
    return this.http.get(url).then(this.onRefreshCaptcha.bind(this));
  }

  getUserStores(): Promise<StoreAndCompanyDto[]> {
    // const url = ItiString.format(api.data, `${entity.userStores}/${this.perCodigo}`);
    return null;//this.http.get(url).then(this.onGetUserStores.bind(this));
  }

  changeActiveStore(tieCodigo: number, saveAsDefaultStore: boolean = true) {
    const url = ItiString.format(api.changeStore, `${tieCodigo}/${saveAsDefaultStore}`);
    this.http.put(url, {}).then(this.onCangeActiveStore.bind(this));
  }

  saveApplicationInitParams(params: Params) {
    this.cacheService.setItem(keyAppInitParams, Utils.encodeObjectToBase64(params), false);
  }

  private onLoginResponse(res: any) {
    const loginResult = this.setLoginResult(Utils.decodeBase64ToObject(res));

    if (loginResult && loginResult.result && !ItiString.isNullOrWhiteSpace(loginResult.accessToken)) {
      this.tokenService.setToken(loginResult.accessToken);
      this.saveLoginResultToCache(res);
      // this.setLanguage(loginResult.language);
      this.loadPermissions(loginResult.rolesHash);
      this.getNotifications();
      //this.signalRConnect();
    }
    return this.loginResultDto.result;
  }

  private onRefreshCaptcha(res: any) {
    if (res && res.Data) {
      this.loginResultDto.userInfo.UserData = res.Data;
    }
  }

  private onGetUserStores(res: any): StoreAndCompanyDto[] {
    if (res) {
      return res.rows?.map((item) => new StoreAndCompanyDto(item));
    }
  }

  private onCangeActiveStore(res: ICompanyAndStoreInfo) {
    if (res) {
      this.loginResultDto.companyAndStoreInfo = res;
      this.changeStore.emit(this.loginResultDto.companyAndStoreInfo);
      this.saveLoginResultToCache(Utils.encodeObjectToBase64(this.loginResultDto));
      this.router.navigate(['/']);
    }
  }

  private getStoredAppInitQueryParams(): Params {
    const params = this.cacheService.getItem(keyAppInitParams, false);
    return params ? Utils.decodeBase64ToObject(params) : {};
  }

  private getFormattedAppInitQueryParams(): string {
    const params = this.getStoredAppInitQueryParams();
    let result = '';
    for (let param in params) {
      result += `${param}=${params[param]}&`;
    }
    return !ItiString.isNullOrWhiteSpace(result) ? `?${result.slice(0, -1)}` : '';
  }

  private async tryLogoff() {
    try {
      await this.http.post(api.logoff, null);
    } catch (error) {
      console.log('logoff error:', error);
    }
  }

  private setLoginResult(loginResult: LoginResultDto) {
    if (loginResult) {
      this.loginResultDto = new LoginResultDto(loginResult);
      const configuration = this.loginResultDto.configuration[0];
      // this.configurationService.setConfiguration(configuration);
      // this.permissionService.setHasAllVisibility(this.loginResultDto.AllVisibility);
      // this.visualModulesService.setModule(configuration.modulo);
      // this.visualModulesService.setTienda(this.tieCodigo);
      // this.visualModulesService.setEmpresa(this.empCodigo);
    } else {
      this.clearLoginResult();
    }

    this.loginChange.emit(this.loginResultDto);
    return this.loginResultDto;
  }

  private saveLoginResultToCache(loginResultEncoded) {
    this.cacheService.setItem(keyLoginResult, loginResultEncoded);
  }

  private loadLoginResultFromCache() {
    let dto = this.cacheService.getItem(keyLoginResult, true);
    if (dto != null) {
      try {
        this.setLoginResult(JSON.parse(dto));
      } catch (e: any) {
        this.logout();
      }
    }
  }

  private clearLoginResult() {
    this.cacheService.removeItem(keyLoginResult);
    this.loginResultDto = null;
  }

  // private setLanguage(language: string) {
  //   if (language != null && this.i18nService.langs.findIndex((x) => x != null && x.toLowerCase() === language.toLowerCase()) !== -1) {
  //     this.i18nService.use(language.toLowerCase());
  //   }
  // }

  private async loadPermissions(hash: string) {
    // try {
    //   await this.permissionService.loadPermissions(hash);
    // } catch (error) {
    //   this.alertsService.toastError(error);
    // }
  }

  private async getNotifications() {
    // try {
    //   this.notificationsService.getNotifications();
    // } catch (error) {
    //   this.alertsService.toastError(error);
    // }
  }

  private async signalRConnect() {
    this.signalRClockConnect();
    this.signalRNotificationsConnect();
  }

  private async signalRClockConnect() {
    // try {
    //   this.signalRClockService.setSignalUrlBase(this.loginResultDto.signalURL);
    //   this.signalRClockService.connect();
    // } catch (error) {
    //   this.alertsService.toastError(`Clock: ${error}`);
    // }
  }

  private async signalRNotificationsConnect() {
    // try {
    //   this.signalRService.setSignalUrlBase(this.loginResultDto.signalURL);
    //   this.signalRService.connect();
    // } catch (error) {
    //   this.alertsService.toastError(`Notifications: ${error}`);
    // }
  }

  private signalRDisconnect() {
    this.signalRClockDisconnect();
    this.signalRNotificationsDisconnect();
  }

  private async signalRClockDisconnect() {
    // try {
    //   await this.signalRClockService.disconnect();
    // } catch (error) {
    //   // ...
    // }
  }

  private async signalRNotificationsDisconnect() {
    // try {
    //   await this.signalRService.disconnect();
    // } catch (error) {
    //   // ...
    // }
  }
}
