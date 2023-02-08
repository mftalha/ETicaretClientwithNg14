import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { UiModule } from './ui/ui.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule, //bu modülün özelliği sadece bulundugu modülde kullanılabiliyor üstünde altında kullanılamıyor : import edildiği ve modül kısmına verildiğği modülde kullanılabiliyor : o yüzden biz temel modülde tanımlıyoruz : ve ardından js ile diğer modüllerden çağırılabilecek hale getirecez.
    HttpClientModule
  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7030/api", multi: true} // appConfig mantıgını burada gerçekleştirdik.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
