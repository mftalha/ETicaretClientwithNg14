import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: RegisterComponent}
    ]),
    //tsconfig.json'da  "noPropertyAccessFromIndexSignature": false,  yapılmalı yoksa inputlara uygularken hata alıyoruz.
    ReactiveFormsModule // bu modülde declare edilen tüm componentlerde Reactive form kullanılacak.
  ]
})
export class RegisterModule { }
