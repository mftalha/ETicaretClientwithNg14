import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService: HttpClientService) { }

  async generateQRCode(productId: string){
    const observable : Observable<Blob> = this.httpClientService.get({
      controller: "products",
      action: "qrcode",
      responseType: 'blob' // bunu ekliyebilmek için => httpclient service de bu düzeltmeyti yaoptık => responseType: requestParameters.responseType as 'json' ==> blob : dosya, png , jpg gibi değerler için => javascript tabanlı http isteklerde eğerki bize dönecek veri json değilse bunu bildirmemiz gerekiyor.
    }, productId)

    return await firstValueFrom(observable);

  }
}
