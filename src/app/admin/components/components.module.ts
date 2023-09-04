import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    CustomersModule,
    DashboardModule,
    AuthorizeMenuModule
    //OrderModule, ProductModule => buraya import gy 'da
  ]
})
export class ComponentsModule { }
