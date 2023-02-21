import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})

  /*
    data: SelectProductImageState | string  == data SelectProductImageState de olabilir , string 'de olabilir.
   */
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent>  {
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string) // list componen.ts sayfasındaki  addProductImages methodundaki data değerini karşılayacaz.
  {
    super(dialogRef)
  }

  //hangi dosyaların kabul edileceğini servise vereceğiz.
  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini seçin veya buraya sürükleyin...",
    isAdminPage: true,
    queryString: `id=${this.data}`
  };
}

export enum SelectProductImageState {
  Close
}
