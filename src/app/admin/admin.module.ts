import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule //eğerki bir modül başka bir modülü kendi içinde benimsiyecekse onu import etmesi gerekiyor.
  ],
  exports: [
    LayoutModule, //layoutmodule içinden export ettiğim comnponentlere erişim için layoutmodulu export ediyorum burda
    ComponentsModule // nerdeki component modül olduğu önemli = biz admindeki component modülü ekliyoruz buraya.
  ]
})
export class AdminModule { }
