import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService, private dialogService: DialogService){
    super(spinner);
  }

  @ViewChild(ListComponent) listComponents: ListComponent  //product componentin altında 2 tane componenet olduğundan hangisini elde etmek istediğimi belirtiyorum. == onun methotlarına erişecem listComponents paremetresi ile.
  // burda yapılan işlem prodoct modül : hem created componenti hem list componenti kapsadığından created componentte eklenen ürünü : list component içindeki listede gösterebilmek için prodoct html ve componenti kullanıyoruz : bir nevi atası olduğu için ilgili componentlerde yapılan işlemleri yakalayabiliyorum burdan ve onların methotlarını tetikleyebiliyorum.
  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts(); //ürün eklendiğinde listeyi tekrar dan güncelleyecektir.
  }

  ngOnInit(): void {
    
  }
  
  showProductQrCodeReading(){
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      data: null,
      options: {
        width: "1000px"
      },
      afterClosed: () => {}
    });
  }

}

