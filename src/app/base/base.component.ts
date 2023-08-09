import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// burası componenetlerimizin base componenetlerini içinde barındiran bi base component olacak.
// bunu servis değilde component şeklinde oluşturma sebebimiz : sonunda componenet yazmasını istememiz.
export class BaseComponent  {

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerNameType: SpinnerType){
    this.spinner.show(spinnerNameType);

    //setTimeout(() => this.hideSpinner(spinnerNameType), 1000);
  }
  
  hideSpinner(spinnerNameType: SpinnerType){
    this.spinner.hide(spinnerNameType);
  }

}

export enum SpinnerType{
  BallScaleMultiple = "s1",
  BallSpinClockiseFade = "s2",
  LineSpinFadeRotating = "s3"
}

/*NgxSpinnerService
 - web sayfasında diğer animasyonlar mevcut github üzerinden web sayfasına gidebilirim
 -https://github.com/Napster2210/ngx-spinner
*/