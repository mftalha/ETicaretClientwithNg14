import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DialogModule } from '../../../dialogs/dialog.module';
import { DeleteModule } from 'src/app/directives/admin/delete.directive.module';




@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent}
    ]),
    MatSidenavModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,
    DialogModule,
    FileUploadModule, //File işlemlerini için modül oluşturmuştuk : ilgili modülü product modülün içinde kullanabilmek için product modüle import ediyoruz.
    DeleteModule
  ]
})
export class ProductsModule { }
