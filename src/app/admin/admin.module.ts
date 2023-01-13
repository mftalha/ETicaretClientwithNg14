import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule //eğerki bir modül başka bir modülü kendi içinde benimsiyecekse onu import etmesi gerekiyor.
  ],
  exports: [
    LayoutModule,
  ]
})
export class AdminModule { }
