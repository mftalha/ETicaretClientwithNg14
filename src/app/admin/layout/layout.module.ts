import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav'; //matarial angularda beğendiğim componenti projeme dahil etmek için
import { RouterModule } from '@angular/router';
// beğendiğim componentin bulunduğu sayfadayken Apı ye tıklıyorum ve üstteki linki alıp buraya yapıştırıyorum
// altta imports içinede MatSidenavModule = süslü parentez içindeki yazıyı import ediyorum.
//önemli nokta : from .. = diye eriştiği dizine meterial anguları terminalden projemize kurduğumudan erişebiliyoruz. == yani terminalden bütün kütüphaneleri yüklüyorum == yükledikten sonra ilgili sayfalarda kullanabiliyorum.


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
  exports:[ //dışarıdan erişilebilir bir componentsin diyoruz : üst modüllerine bağlı componentlerden erişim diye biliyroum
    LayoutComponent //LayoutCompenenti app.compenent.html de kullanacağımdan yani arada birden fala modül olduğundan bu geçişleri yapmam lazım
    // nasıl yapacam = ilk modülde componenti export edecem = sonraki alan modüllerde ise son alıp kullanan modüle kadar = modülü bir sonrakine export edecem.
  ]
})
export class LayoutModule { }


// eğer bir modül'e bağlı component varsa =  declarations içinde belirtilmelidir.
// eğer bir modül'e bağlı başka bir iç modül varsa import's kısmında belirtilmelidir
// eğer bir modül kendi modülne bağlı componenti üst modüle aktaracaksa = exports kısmına o componenti yazmalıdır 
// eğer bir modül kendine bağlı başka bir modülün componentini = bağlandığı üst modüle atacaksa = componentin bağlı olduğu : şuanki modülün bir alt modüşünü export kısmına yazmalıdır = burda bir alt modül deme sebebim = modülden modüle aktara aktara gelen component olabilir = o yüzden biz son olarak bulunduğu modülden alıyoruz = şuanki modülden önceki en üst modülden yani.