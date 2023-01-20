import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule // yönlendirme ve sayfaya yükleme komutlarını kullanacaksak html sayfalarından == bunu .ts ye eklememiz gerekiyor
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }

//bu module = layout da kullanacağım componentler için.
// bu module = footer , header ,sedebar componentleri otomatik eklenmeliydi diye biliyorum.