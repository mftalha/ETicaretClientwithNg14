import { Injectable } from '@angular/core';
declare var alertify: any; //alertfy kütüphanesini kullanabilmek için = içinden bir nesneyi böyle build etmem gerekiyor. 

@Injectable({
  providedIn: 'root' // kullanmak istediğim dosya yolunun = component.ts sinde priveders: [] içine root'u eklediğimde ios contniere daki buna depending enjection ile erişim sağlatabilriz ilgili component üyelerinden == ama biz yine deppending injection ile componentler den farklı bir yöntem ile çağıracaz.
})
export class AlertifyService {

  constructor() { }

  //message(message: string, messageType: MessageType, position: Position, delay: Number =3, dismissOthers: boolean =false)
  //message(message: string, options: AlertfyOptions) // bu şekilde yaptığımda çağırdığım yerde AlertfyOptions un new diyip nesne sini oluşturma gibi bi mantığa girmem gerekiyormuş buna gerek kalmadan {} diyip içine direk property nesne class ındaki nesneleri verebilmek için aşşağıdaki gibi Partial eklemem gerekli.
  message(message: string, options: Partial<AlertfyOptions>){
    //delay: Number =3  == integer olarak olacağını belirttiğim delay'a default olarak 3 veriyorum = değer girilmez ise 3 alacak. girilirse girilen değer'i alacak.
    const msj = alertify[options.messageType](message); //bu sayede artık yukarıda bizim oluşturduğumuz method ile istediğimiz alertfy türüne istediğimiz mesage'yi yazdırabileceğiz.
    //alertify["error"]()  // bu şekilde js nin özelliği sayesinde alertify'e erişim sağlayabilirim
    // eğerki property olsaydı alertify alertify["error"] == "asd" gibisinden verebilirdim value'yi
    alertify.set("notifier","position", options.position); //burada'da alertify'in pozisyonunu veriyoruz Enum yardımı ile
    alertify.set('notifier','delay', options.delay); // alertfy'e delay veriyoruz.

    //eğerki açılan alertify için dismisOter paremetresi true verilirse = sayfada önceden açık kalan tüm alertfy ler kapatılır ve sadece o an açtığımız alertfy'in görünmesini sağlar.
    // default olarak false veriyorum = böylece = true verilmediği sürece bu özellik pasif olacak
    if(options.dismissOthers)
      msj.dismissOthers();
  }

  dismiss(){
        //bunun bide açılan alertfy'e özel kapanmasonı sağlamak için dismis() var direk.
        alertify.dismissAll(); // sayfada herhangi biyere tıklandığında açılan bütün alertfylerin kapanmasını sağlar.
  }
}

export class AlertfyOptions{ //methot paremetrelerini nesne haline getirme. = daha doğru bir kullanım denebilir. = en azından daha profesyonel duruş.
messageType: MessageType = MessageType.Message; //= ile default değerlerini atıyorum.
position: Position = Position.BottomLeft;
delay: number = 3;
dismissOthers: boolean = false;
}

// mesaj türlerini alan bi enum oluşturuyoruz = alertify mesaj isimleri ile aynı olacak
export enum MessageType{
  Error = "error",  //MessageType.Error seçildiğinde == error stringi dönsün.
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}