import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    CustomersModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
