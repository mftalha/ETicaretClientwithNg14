import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_images';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';


declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})

  /*
    data: SelectProductImageState | string  == data SelectProductImageState de olabilir , string 'de olabilir.
   */
  // implements OnInit => veri çekme işlemlerini bu methodu imlemente edip çekiyoruz.
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit  {
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string, // list componen.ts sayfasındaki  addProductImages methodundaki data değerini karşılayacaz.
    private productService: ProductService,
    private spinner:  NgxSpinnerService,
    private dialogService: DialogService)
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

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallSpinClockiseFade);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallSpinClockiseFade));  // as string => string gelecek diye garanti veriyoruz ve string'e dönültürüyor
  }

  async deleteImage(imageId: string, event: any){

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async() => {
        this.spinner.show(SpinnerType.BallScaleMultiple)
      await this.productService.deleteImage(this.data as string, imageId, () => {
        this.spinner.hide(SpinnerType.BallScaleMultiple);
        var card = $(event.srcElement).parent().parent();
        card.fadeOut(500)
      });
      }
    })

    
  }

}

export enum SelectProductImageState {
  Close
}
