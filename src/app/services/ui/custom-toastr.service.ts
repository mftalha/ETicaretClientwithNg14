import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  message(message: string, title: string, toastrOptions: Partial<ToastrOptions>){
    this.toastr[toastrOptions.messageType](message, title, { //burada  toastr.success == yerine toastr[toastrOptions.messageType] yazdık aynı işlevi karlılıyo= . yenirne []
      positionClass: toastrOptions.possition
    });
  }
  /*
    showSuccess(){
      this.toastr.success('Hello world!', 'Toastr fun!',{timeOut : 3000 , positionClass : 'toast-top-left'} );
    };
  */
}


export enum ToastrMessageType{
  Error = "error",  //MessageType.Error seçildiğinde == error stringi dönsün.
  Info = "info",
  Success = "success",
  Warning = "warning"
}

export enum ToastrPosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}

export class ToastrOptions{
  messageType: ToastrMessageType;
  possition: ToastrPosition;
}
