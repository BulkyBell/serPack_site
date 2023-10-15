import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  setItem(key: string, value: string, encodeB64: boolean = false) {
    const _value = encodeB64 ? Base64.encode(value) : value;
    sessionStorage.setItem(key, _value);
  }

  getItem(key: string, decodeB64: boolean = false) {
    const result = sessionStorage.getItem(key);
    return decodeB64 ? Base64.decode(result) : result;
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
