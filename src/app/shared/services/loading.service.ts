import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount: number = 0;
  private showLog = false;
  private showTime = true;

  get isLoading(): boolean {
    return this.loadingCount > 0;
  }

  enableLoading() {
    if (this.showTime && this.loadingCount === 0) {
      console.time('loading');
    }
    this.loadingCount++;

    if (this.showLog) {
      console.log('this.loadingCount: ' + this.loadingCount);
    }
  }

  disableLoading() {
    this.loadingCount--;

    if (this.showLog) {
      console.log('this.loadingCount: ' + this.loadingCount);
    }

    if (this.showTime && this.loadingCount === 0) {
      console.timeEnd('loading');
    }
  }

  runWithLoading(metodo: any) {
    this.enableLoading();
    setTimeout(() => {
      metodo();
      this.disableLoading();
    }, 1);
  }
}
