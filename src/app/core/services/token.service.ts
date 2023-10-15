import { EventEmitter, Injectable } from '@angular/core';
import { keyToken } from '@shared';
import { Base64 } from 'js-base64';
import { CacheService } from 'src/app/core';

import { IJWTPayload } from '../models';
import { ItiString } from './../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cacheService: CacheService) {}

  tokenChange: EventEmitter<any> = new EventEmitter<any>();

  hasToken() {
    return !ItiString.isNullOrWhiteSpace(this.getToken());
  }

  setToken(token: string) {
    this.cacheService.setItem(keyToken, token);
    this.tokenChange.emit(true);
  }

  public getToken(): string {
    return this.cacheService.getItem(keyToken);
  }

  clearToken() {
    this.cacheService.removeItem(keyToken);
    this.tokenChange.emit(false);
  }

  decodeToken(): IJWTPayload {
    try {
      return this.hasToken() ? JSON.parse(Base64.decode(this.getToken().split('.')[1])) : null;
    } catch (error) {
      console.log('Unable to decode token', error);
      return null;
    }
  }
}
