import { Component, OnInit, Type, ViewChild } from '@angular/core';
declare var $:any //jquery kütüphansini ilgili componente bağlı sayfalarda kullanabilmek için dolar işaretini burada build ediyiyorum. 
//jquery'in başarılı bir şekilde projeye dahil edildiğini anlayabiliyorum jqueryin doları ile.
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from './base/base.component';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

//import ettiğimiz Component ismi farklı kütüphanlerdede kullanıldığında çakışma oluştuğundan farklı bir çağırma ismi veriyoruz.
//import {Component as DynamicComponent} from '../app/services/common/dynamic-load-component.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  // directive'nin nesnesini oluşturuyoruz => modal içinde gösterdiğimiz sepet verileri için.
  @ViewChild(DynamicLoadComponentDirective, { static: true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(spinner: NgxSpinnerService, public authService: AuthService, private toastrServices: CustomToastrService, private router: Router, private dynamicLoadComponentService: DynamicLoadComponentService) {
    authService.identityCheck();
    super(spinner);
  }
  ngOnInit() {
    //this.showSpinner(SpinnerType.BallSpinClockiseFade); //base componentten spinneri çekip çalıştırabilmek için.
    /** spinner starts on init */
    //this.spinner.show("s3"); // spinir'i base componentten çekmeden çalıştırabilmek için.

  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrServices.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      possition: ToastrPosition.TopRight
    })
  }

  loadComponent() {
    // ilgili directive üzerinden yükleme işlemini gerçekeltiriyoruz
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef);
  }

}



//$.get("https://localhost:7030/api/products", data=>{console.log(data)}) //api uygulammızdan istekde bulunuyoruz = cross politikalarını test etmek için == apide program.cs de cross politikalarını herkeze veya bu uygulamaya izin vermediğimde hata aldım. izin verdikten sonra apiden veri çekebildim buraya.

//$.get("https://localhost:7030/api/products")

/* //jquery testini yaptık.
$(document).ready(()=>{ //sayfa açıldığında jquery ile alert basıyoruz.
  alert("asd")
})
*/