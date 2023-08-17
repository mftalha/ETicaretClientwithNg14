import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  // connection bilgimizi tutuyor.
  private _connection: HubConnection; 
  get connection(): HubConnection{ // capsulation
    return this._connection;
  }


  //başlatılmış bir hub dönecek
  start(hubUrl:string) {
    // hub bağlanmamış ise veya bağlanmış iletişim kurmamış ise => bağlantıyı sağlayana kadar bu if'in altına geçmeyecektir.
    if(!this.connection || this.connection?.state == HubConnectionState.Disconnected){
      const builder : HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl)//hub connection'un hangi url'ye bağlanacağını bildiriyoruz
        .withAutomaticReconnect() // otomatik bağlantı oluşması gerektiğini ifade ediyoruz
        .build();

      //Bağlantıyı gerçekleştiriyoruz
      hubConnection.start()
      //bağlantı sağlandığında
      .then(() => console.log("Connected"))
      .catch(error => setTimeout(() => this.start(hubUrl), 2000)); // başarılı olana kadar bu methodu 2 saniyede bir çağır : bağlantı kopma durumlarına karşı

      this._connection = hubConnection;
    }

    // Eğerki kopan bağlantı tekrardan sağlanırsa
    this._connection.onreconnected(connectionId => console.log("Reconnected"));
    this._connection.onreconnecting(error => console.log("Reconnecting"));
    this._connection.onclose(error => console.log("Close reconnection"))
  }

  // signalR üzerinden bir client'in diğer clientler ile iletişim kurması gerekirse
  // procedureName mesaj fonksiyonubnun ismi
  invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.connection.invoke(procedureName, message)
    .then(successCallBack)
    .catch(errorCallBack)
  }

  // runtime'da server üzerinden gelen fonksiyonları(anlık mesajları) yakalamamı sağlıyacak. : temel alıcı => client olarak ben tetikleneceksem, bana mesaj gelecekse
  on(procedureName: string, callBack: (...message: any) => void) { //c#'daki params'a karşılık geliyor yani bir dizi tanımlıyor => ..message
    this.connection.on(procedureName, callBack);
  }

}
