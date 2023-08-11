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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';

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
    HttpClientModule,
    MatDialogModule,
    JwtModule.forRoot({
      config:{
        // npm i @auth0/angular-jwt => githubda dökümantasyonu mevcuttur.
        // tüm isteklerde ilgili apilere bu token'ı ekle
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7030"], // bu api adreslerine istek gönder diye belirtiyoruz.
        //disallowedRoutes => // bu api isteklerine istek hiçbirtürlü gönderme diye verebiliyoruz
      }
    }) //  token işlemleri için dahil ettiğimiz kütüphane
  ],
  providers: [
    {
      provide: "baseUrl", useValue: "https://localhost:7030/api", multi: true
    }, // appConfig mantıgını burada gerçekleştirdik.
    { // ERROR Error: Uncaught (in promise): NullInjectorError: R3InjectorError = hatası için eklendi 
      provide: MatDialogRef,
      useValue: {}
    } // = https://stackoverflow.com/questions/71017852/error-error-uncaught-in-promise-nullinjectorerror-r3injectorerror
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
