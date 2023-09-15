import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { DeleteModule } from 'src/app/directives/admin/delete.directive.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path :"", component: UserComponent}
    ]),
    MatSidenavModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,
    DialogModule,
    DeleteModule
  ]
})
export class UserModule { }
