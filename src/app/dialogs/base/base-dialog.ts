import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> { //generic type veriyorum = DialogComponent> ahmette olabilirdi.

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {

  }

  close(): void {
    this.dialogRef.close();
  }
}


/*
 * Dialoglarda(modul) ortak kullanılacak componentleri burada tanımlıyoruz tekrar yapmamak için
 * bütün dilaoogları tek biyerden türetmeme sebebimiz : dialog içerikleri değişebilir olması : deletede iptal ,evet butonları var mesela = farklı kullanımlar olabilir.
 * 
 */
