import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertfy: AlertifyService) {
   super(spinner);   //spinner için == beklerken dönen şey == 1 saniyeden fazla sürdüğünde gösterme gibi bir mantığı var galiba ondan eğer 1 saniyeden kısa sürerse spining görünmez.
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter(); // bunu selecter üzerinden  referans eden componente fırlattık. = product.component : bu yüzden product.component.html sayfasında kullanabiliriz artık bunu. == ürün ekleme başarılı oldugunda aşşagıda yaptık : product.html sayfasına atacak : oradanda : product component sayfası üzerinden list component sayfasndaki method çağrılıp tablo güncellenecek : ekleme işlemi yapılduğında.
  /* dosya yüklemeyle artık burda işimiz yok
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri sürükleyin veya seçin...",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg" //bu dosyalar  kabul edilsin sade ve : klasör seç dediğimde sadece bu dosya uzantıları görülsün.
  }; *///burdan verdiğim -> component html sayfasına ordanda options ile : field-upload.component.ts sayfasına(servise) gidecek ordanda api ye veri akışı sağlanacak : @Output olarak işaretleme sebebim == dışarıya gidecek olması.

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {

     this.showSpinner(SpinnerType.LineSpinFadeRotating); //spinner için == beklerken dönen şey

    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);


    this.productService.create(create_product, () => { // burda () == yapısı ile callback fonksiyonunu kullanıyoruz. : açıklaması gittiği sayfada var.
      this.hideSpinner(SpinnerType.LineSpinFadeRotating);
      this.alertfy.message("Ürün başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_product);
    }, errorMessage => {
      this.alertfy.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
        });
    });
  }
}
