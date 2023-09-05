import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
      private roleService: RoleService,
      private alertfy: AlertifyService) {
    super(spinner);   //spinner için == beklerken dönen şey == 1 saniyeden fazla sürdüğünde gösterme gibi bir mantığı var galiba ondan eğer 1 saniyeden kısa sürerse spining görünmez.
   }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
 
   @Output() createdRole: EventEmitter<string> = new EventEmitter(); // bunu selecter üzerinden  referans eden componente fırlattık. = product.component : bu yüzden product.component.html sayfasında kullanabiliriz artık bunu. == ürün ekleme başarılı oldugunda aşşagıda yaptık : product.html sayfasına atacak : oradanda : product component sayfası üzerinden list component sayfasndaki method çağrılıp tablo güncellenecek : ekleme işlemi yapılduğında.
   /* dosya yüklemeyle artık burda işimiz yok
   @Output() fileUploadOptions: Partial<FileUploadOptions> = {
     action: "upload",
     controller: "products",
     explanation: "Resimleri sürükleyin veya seçin...",
     isAdminPage: true,
     accept: ".png, .jpg, .jpeg" //bu dosyalar  kabul edilsin sade ve : klasör seç dediğimde sadece bu dosya uzantıları görülsün.
   }; *///burdan verdiğim -> component html sayfasına ordanda options ile : field-upload.component.ts sayfasına(servise) gidecek ordanda api ye veri akışı sağlanacak : @Output olarak işaretleme sebebim == dışarıya gidecek olması.
 
   
   create(name: HTMLInputElement) {
 
      this.showSpinner(SpinnerType.LineSpinFadeRotating); //spinner için == beklerken dönen şey

      this.roleService.create(name.value, () => { // burda () == yapısı ile callback fonksiyonunu kullanıyoruz. : açıklaması gittiği sayfada var.
       this.hideSpinner(SpinnerType.LineSpinFadeRotating);
       this.alertfy.message("Role başarıyla eklenmiştir.", {
         dismissOthers: true,
         messageType: MessageType.Success,
         position: Position.TopRight
       });
       this.createdRole.emit(name.value);
     }, errorMessage => {
       this.alertfy.message(errorMessage, {
         dismissOthers: true,
         messageType: MessageType.Error,
         position: Position.TopRight
         });
     });
     
   }
   
}
