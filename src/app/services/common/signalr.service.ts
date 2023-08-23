import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  //@Inject("baseSignalRUrl") => app.module içindeki provider
  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string ){}

  //başlatılmış bir hub dönecek
  start(hubUrl:string) {
    hubUrl = this.baseSignalRUrl + hubUrl;
    
    const builder : HubConnectionBuilder = new HubConnectionBuilder();

    const hubConnection: HubConnection = builder.withUrl(hubUrl)//hub connection'un hangi url'ye bağlanacağını bildiriyoruz
      .withAutomaticReconnect() // otomatik bağlantı oluşması gerektiğini ifade ediyoruz
      .build();

    //Bağlantıyı gerçekleştiriyoruz
    hubConnection.start()
    //bağlantı sağlandığında
      .then(() => console.log("Connected"))
      .catch(error => setTimeout(() => this.start(hubUrl), 2000)); // başarılı olana kadar bu methodu 2 saniyede bir çağır : bağlantı kopma durumlarına karşı
    
    // Eğerki kopan bağlantı tekrardan sağlanırsa
    hubConnection.onreconnected(connectionId => console.log("Reconnected"));
    hubConnection.onreconnecting(error => console.log("Reconnecting"));
    hubConnection.onclose(error => console.log("Close reconnection"))
    return hubConnection;
  }

  // signalR üzerinden bir client'in diğer clientler ile iletişim kurması gerekirse
  // procedureName mesaj fonksiyonubnun ismi
  invoke(hubUrl:string, procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.start(hubUrl).invoke(procedureName, message)
    .then(successCallBack)
    .catch(errorCallBack)
  }

  // runtime'da server üzerinden gelen fonksiyonları(anlık mesajları) yakalamamı sağlıyacak. : temel alıcı => client olarak ben tetikleneceksem, bana mesaj gelecekse
  on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) { //c#'daki params'a karşılık geliyor yani bir dizi tanımlıyor => ..message
    this.start(hubUrl).on(procedureName, callBack);
  }

}
