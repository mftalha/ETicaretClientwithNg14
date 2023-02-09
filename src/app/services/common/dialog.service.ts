import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

//@Injectable({
//  providedIn: 'root'
//})
@Injectable({
  providedIn: "root"
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width, //burda options dan sonra nullable operatörünü kullanma sebebimiz null olarak alma gibi mantıktan patlıyor. ondan
      height: dialogParameters.options?.height, // options null ise height'ı tetikle : değil ise burda kes anlamında nulable : if else girmeyelim diye.
      position: dialogParameters.options?.position,
      data: dialogParameters.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data)
        dialogParameters.afterClosed();
    });
  }
}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options?: Partial<DialogOptions> = new DialogOptions(); //null geldiğinde  new Dialogs diyip başlangıç değeri atıyoruz gibi bir mantık.
}

export class DialogOptions {
  width?: string;
  height?: string;
  position?: DialogPosition;
}
