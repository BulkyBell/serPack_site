import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { lastValueFrom, Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { LoadingService } from '../../shared/services/loading.service';
import { ItiString } from './../../shared/utils';
import { AppConfigService } from './app-config.service';
import { TokenService } from './token.service';

import { keyToken } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  static readonly ResponseContentTypeBlob = 'blob';
  readonly optionsForResponseWithBlob = { observe: 'response', responseType: HttpService.ResponseContentTypeBlob };

  httpTimeout = 60000;
  trace: boolean;
  private rgtoken: string;

  tokenExpired: EventEmitter<any> = new EventEmitter<any>();

  private apiUrl: string;
  private internalErrMessages: string[];
  private _errorMessages = new Subject<string[]>();
  _errorMessages$ = this._errorMessages.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private appConfigService: AppConfigService,
    protected tokenService: TokenService,
    // protected alertsService: AlertsService,
  ) {
    this.trace = false;
    this.apiUrl = this.getApiUrl();
    this.clearErrMessages();
  }

  get errMessages(): string[] {
    return this.internalErrMessages;
  }

  get(url: string, showLoading: boolean = true, options?: any): Promise<any> {
    this.consoleLog('get(' + url + ')');
    this.enableLoading(showLoading);

    options = this.setOptions(options);
    const promise = lastValueFrom(this.http.get(this.appendApiUrl(url), options).pipe(timeout(this.httpTimeout)));
    return promise.then((data) => this.handleResult(data, showLoading)).catch((error) => this.handleError(error, showLoading));
  }

  getBlob(url: string, showLoading: boolean = true): Promise<any> {
    return this.get(this.appendApiUrl(url), showLoading, this.optionsForResponseWithBlob).then(this.downloadData.bind(this));
  }

  post(url: string, body: any, showLoading: boolean = true, options?: any): Promise<any> {
    this.consoleLog('post(' + url + ')');
    this.enableLoading(showLoading);

    options = this.setOptions(options);
    const promise = lastValueFrom(this.http.post(this.appendApiUrl(url), body, options).pipe(timeout(this.httpTimeout)));
    return promise.then((data) => this.handleResult(data, showLoading)).catch((error) => this.handleError(error, showLoading));
  }

  postFile(url: string, file: Blob, fileName: string, showLoading: boolean = true): Promise<any> {
    this.consoleLog('post(' + url + ')');
    this.enableLoading(showLoading);

    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const promise = lastValueFrom(this.http.post(this.appendApiUrl(url), formData));
    return promise.then((data) => this.handleResult(data, showLoading)).catch((error) => this.handleError(error, showLoading));
  }

  put(url: string, body: any, showLoading: boolean = true, options?: any): Promise<any> {
    this.consoleLog('put(' + url + ')');
    this.enableLoading(showLoading);

    options = this.setOptions(options);
    const promise = lastValueFrom(this.http.put(this.appendApiUrl(url), body, options).pipe(timeout(this.httpTimeout)));
    return promise.then((data) => this.handleResult(data, showLoading)).catch((error) => this.handleError(error, showLoading));
  }

  putBlob(url: string, body: any, showLoading: boolean = true): Promise<any> {
    return this.put(this.appendApiUrl(url), body, showLoading, this.optionsForResponseWithBlob).then(this.downloadData.bind(this));
  }

  delete(url: string, showLoading: boolean = true, options?: any): Promise<any> {
    this.consoleLog('delete(' + url + ')');
    this.enableLoading(showLoading);

    const data = lastValueFrom(this.http.delete(this.appendApiUrl(url), options).pipe(timeout(this.httpTimeout)));
    return data.then((data) => this.handleResult(data, showLoading)).catch((error) => this.handleError(error, showLoading));
  }

  patch(url: string, body: any, showLoading: boolean = true, options?: any): Promise<any> {
    this.consoleLog('patch(' + url + ')');
    this.enableLoading(showLoading);

    options = this.setOptions(options);
    const data = lastValueFrom(this.http.patch(this.appendApiUrl(url), body, options).pipe(timeout(this.httpTimeout)));

    return data.then((data) => this.handleResult(data, showLoading)).catch((error) => this.handleError(error, showLoading));
  }
  getFilenameInHeader(res: HttpResponse<any>): string {
    const contentDisposition = res.headers.get('Content-Disposition');
    const filename = this.extractFilenameFromContentDisposition(contentDisposition);

    if (!ItiString.isNullOrWhiteSpace(filename)) {
      return this.decodeFilename(filename);
    }

    return null;
  }

  downloadData(res: HttpResponse<Blob>) {
    if (res && res.status === 200) {
      const filename: string = this.getFilenameInHeader(res);

    //   if (filename != null) {
    //     const blob = res.body;
    //     FileSaver.saveAs(blob, filename);
    //   } else {
    //     this.alertsService.toastError('noFoundFile');
    //   }
    // } else {
    //   this.alertsService.toastError(res.statusText);
     }
  }

  downloadBlob(blob: Blob, filename: string) {
    // FileSaver.saveAs(blob, filename);
  }

  tokenExpire() {
    this.tokenExpired.emit(null);
  }

  // Tratamiento en caso de acción fallida al api
  // Sabemos que es un array de string porque así lo devuelve en error.interceptor.ts
  apiActionFailed(res: string[]) {
    this._errorMessages.next(res);
  }

  clearErrMessages() {
    this.internalErrMessages = [];
  }

  addErrMessage(message: string) {
    this.internalErrMessages.push(message);
    this._errorMessages.next(this.internalErrMessages);
  }

  removeErrMessage(index: number) {
    this.internalErrMessages.splice(index, 1);
  }

  private consoleLog(logMessage: string) {
    if (this.trace) {
      console.log(logMessage);
    }
  }

  private enableLoading(showLoading: boolean) {
    if (showLoading) {
      this.loadingService.enableLoading();
    }
  }

  private handleResult(data: any, showLoading: boolean): Promise<any> {
    if (showLoading) {
      this.loadingService.disableLoading();
    }
    return Promise.resolve(data);
  }

  private handleError(error: any, showLoading: boolean): Promise<any> {
    if (showLoading) {
      this.loadingService.disableLoading();
    }
    this.apiActionFailed(error);
    return Promise.reject(error);
  }

  private setOptions(options?: any) {
    this.rgtoken = this.tokenService.getToken()!;
    // this.rgtoken = sessionStorage.getItem(keyToken);
    options = options || {};
    options.headers = options.headers || new HttpHeaders();
    if ((this.rgtoken == null) && (!options.headers.has('Content-Type'))) {
      options.headers = options.headers.append('Content-Type', 'application/json');

      console.log('<=================== no hay token ===========================>')

    } else {
      if ((this.rgtoken != null) && (this.rgtoken.length > 0)) {
        options.headers = options.headers.set('Content-Type', 'application/json').set('Access-Token', this.rgtoken );
      console.log(this.rgtoken);
      }
    }

    console.log(options.headers);
    
    return options;
  }

  private extractFilenameFromContentDisposition(contentDisposition: string): string {
    if (contentDisposition != null && contentDisposition.length > 0) {
      const pairs = contentDisposition.split(';');
      if (pairs.length > 1) {
        const values = pairs[1].split('=');
        if (values.length > 1) {
          const result = values[1];
          if (result.startsWith('"') && result.endsWith('"')) {
            return result.substr(1, result.length - 2);
          } else {
            return result;
          }
        }
      }
    }
    return null;
  }

  private decodeFilename(filename: string): string {
    if (filename.toUpperCase().startsWith('UTF-8')) {
      filename = filename.substr(7, filename.length);
      filename = decodeURI(filename);
    }
    return filename;
  }

  private getApiUrl(): string {
    return this.appConfigService.get('apiUrl');
  }

  private appendApiUrl(url: string): string {
    return this.apiUrl + url;
  }
}
