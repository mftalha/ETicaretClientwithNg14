import { Component, OnInit, Type } from '@angular/core';
declare var $:any //jquery kütüphansini ilgili componente bağlı sayfalarda kullanabilmek için dolar işaretini burada build ediyiyorum. 
//jquery'in başarılı bir şekilde projeye dahil edildiğini anlayabiliyorum jqueryin doları ile.
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from './base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'ETicaretClient';

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit() {
    //this.showSpinner(SpinnerType.BallSpinClockiseFade); //base componentten spinneri çekip çalıştırabilmek için.
    /** spinner starts on init */
    //this.spinner.show("s3"); // spinir'i base componentten çekmeden çalıştırabilmek için.

  }


}



//$.get("https://localhost:7030/api/products", data=>{console.log(data)}) //api uygulammızdan istekde bulunuyoruz = cross politikalarını test etmek için == apide program.cs de cross politikalarını herkeze veya bu uygulamaya izin vermediğimde hata aldım. izin verdikten sonra apiden veri çekebildim buraya.

//$.get("https://localhost:7030/api/products")

/* //jquery testini yaptık.
$(document).ready(()=>{ //sayfa açıldığında jquery ile alert basıyoruz.
  alert("asd")
})
*/