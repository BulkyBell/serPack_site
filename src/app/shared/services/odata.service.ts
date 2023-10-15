import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { CacheService, HttpService, TokenService } from '../../core';
import CustomStore from 'devextreme/data/custom_store';
import { AppInjector } from '@core';
import { ApiAdapter } from '../../core/api-adapter';
import { api } from '../api';
import { Params, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class oDataService {
    dataSource: CustomStore;
    protected urlBase: string;
    protected injector: Injector;
    // protected http: HttpService;
    protected _from: string;

    constructor(
        protected http: HttpService,
        protected tokenService: TokenService,
        // protected cacheService: CacheService,
        ){
        // this.injector = AppInjector.getInjector();
        // this.http = this.injector.get(HttpService);
        this.urlBase = api.odata;
    }

    createStore(from: string, pkey: string) {
        this._from = from;
        this.dataSource = new CustomStore({
            key: pkey,
            load: this.load.bind(this),
          });
    }

    protected async load(loadOptions: any) {
        return this.http
          .get(`${api.odata}${this._from}`/*?$format=JSON`*/, false, null)

          .catch(this.http.apiActionFailed.bind(this));
    }

    protected reset() {
        this.http.clearErrMessages();
    }

    public querydata(from: string): Promise<any> {
        // Nos aseguramos que la llamada a login no incluya el token en las Headers
        // this.tokenService.clearToken();
        // return this.http.post(`${api.login}${queryParams}`, json).then(this.onQueryDataResponse.bind(this));
        return null;    
    }

        
    private onQueryDataResponse(res: any) {
        return res;        
    }
}