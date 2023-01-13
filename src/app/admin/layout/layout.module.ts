import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    RouterModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }


// eğer bir modül'e bağlı component varsa =  declarations içinde belirtilmelidir.
// eğer bir modül'e bağlı başka bir iç modül varsa import's kısmında belirtilmelidir
// eğer bir modül kendi modülne bağlı componenti üst modüle aktaracaksa = exports kısmına o componenti yazmalıdır 
// eğer bir modül kendine bağlı başka bir modülün componentini = bağlandığı üst modüle atacaksa = componentin bağlı olduğu : şuanki modülün bir alt modüşünü export kısmına yazmalıdır = burda bir alt modül deme sebebim = modülden modüle aktara aktara gelen component olabilir = o yüzden biz son olarak bulunduğu modülden alıyoruz = şuanki modülden önceki en üst modülden yani.