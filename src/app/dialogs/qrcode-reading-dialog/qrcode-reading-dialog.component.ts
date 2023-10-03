import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType } from 'src/app/base/base.component';

declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
     private spinner: NgxSpinnerService,
     private toastrService: CustomToastrService,
     private productService: ProductService) {  
    super(dialogRef)
  }

// html'deki tagları temsil ediyoruz burada
  @ViewChild("scanner", { static: true }) scanner : NgxScannerQrcodeComponent; 
  // { static: true } => sayfa ayağa kaldırıldığında
  @ViewChild("txtStock", { static: true }) txtStock : ElementRef; 

  // ilgili html açıldığında
  ngOnInit(): void {
    this.scanner.start();  // => kamererayı aç
  }

  //ilgili html kapandığında
  ngOnDestroy(): void {
    this.scanner.stop();  // kamerayı kapat
  }

  //qr code okunduğunda
  onEvent(e){
    this.spinner.show(SpinnerType.BallScaleMultiple);
    const data: any = (e as {data: string }).data;
    if(data != null && data != ""){
      const jsonData = JSON.parse((e as {data: string }).data) //qrcode üzerindeki veriler => fiyat, id, stock gibi bilgiler
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value  // kaçtane

      
      this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue), () => {
        $("#btnClose").click(); //qrcode okuma işleminden sonra sayfayı kapat => birden fazla qrcode okuma işlemi yapacaksam bunu kaldırabilirim.
        this.toastrService.message(`${jsonData.Name} ürünün stok bilgisi ${stockValue} olarak güncellenmiştir.`, "Stok Başarıyla Güncellendi",{
          messageType: ToastrMessageType.Success,
          possition: ToastrPosition.TopRight
        });

        this.spinner.hide(SpinnerType.BallScaleMultiple);
      });
      
    }
  }

}
