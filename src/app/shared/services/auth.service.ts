import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {LoginService} from '@shared';

const defaultPath = '/';
const defaultUser = {
  userId: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  private _user = defaultUser;
  private _isLogged: boolean = false;
  loginMessage = undefined;
  textTwoLevel: string;

  // protected _loginService: LoginService;

  get loggedIn(): boolean {
    return this._isLogged;
  }

  private _lastAuthenticatedPath: string = defaultPath; 
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, protected loginService: LoginService) {
    // _loginService = loginService;
  }

  async logIn(userId: string, password: string) {
    this.loginMessage = null;
    let _textTwoLevel: string = "";
    let _userid: string = userId;
    let _password: string = password;
    try {

      const loginOk = await this.loginService.login(_userid, _password, _textTwoLevel);
      this.textTwoLevel = null;

      if (loginOk) {
        const isPasswordExpired = false;//await this.checkPasswordExpired();
        if (isPasswordExpired) {
          this.changePassword(userId, password);
        } 
        // else {
        //   this.flowWithStores();
        // }
        this._isLogged = true;
        this._user = { ...defaultUser, userId};
        this.router.navigate(["home"]);//[this._lastAuthenticatedPath]);

        return {
          isOk: true,
          data: this._user
        };

      } else {
        this._isLogged = false;
        this.loginMessage = this.loginService.loginMessage;// ? this.loginService.loginMessage;
        return {
          isOk: false,
          message: "Authentication failed"
        };
      }
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  }

  async createAccount(email, password) {
    try {
      // Send request

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    await this.loginService.logout(true);
    this._user = null;
    this._isLogged = false;
    this.router.navigate(['/login-form']);
  }

  private getLoginError(error: any) {
    const errorDecoded = "";//Utils.decodeApiError(error);
    const unknownError = 'Error desconocido';//this.i18nService.instant('errorCodes.unknown');

    // if (errorDecoded.isDecoded) {
    //   if (errorDecoded.isErrorCode && this.i18nService.hasTranslation(errorDecoded.errorCodeI18n)) {
    //     return this.i18nService.instant(errorDecoded.errorCodeI18n);
    //   } else {
    //     return unknownError;
    //   }
    // } else if (this.i18nService.hasTranslation(errorDecoded.error)) {
    //   return this.i18nService.instant(errorDecoded.error);
    // } else {
      return unknownError;
    // }
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;
  }
}
