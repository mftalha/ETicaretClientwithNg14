import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

    constructor(spinner: NgxSpinnerService,
      private roleService: RoleService,
      private alertifyService: AlertifyService,
      private dialogService: DialogService) //dialogu açmak için
    {
      super(spinner)
    }

    displayedColumns: string[]= ['name', 'edit', 'delete'];
    dataSource: MatTableDataSource<List_Role> = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    async getRoles(){
      this.showSpinner(SpinnerType.LineSpinFadeRotating);
      const allRoles: { datas: List_Role[], totalRoleCount: number } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize: 5, () => this.hideSpinner(SpinnerType.LineSpinFadeRotating), errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }))
      

      this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas); // tabloya verdiğim veriler
      this.paginator.length = allRoles.totalRoleCount; 
      // tabloya verileri alttan sayfaya tıkladıkça getirdiğimizden : alttaki sayfa butonları aktif olsun diye : totalde bu kadar veri var diye belirtiyoruz. : yoksa mesela başta 5 veri geldiğinden aşşagıda 2. sayfa aktif olmuyor : yada 2. sayfaya geçiş butonu.
      //this.dataSource.paginator = this.paginator;
    }

    

    async pageChanged() {
      await this.getRoles();
    }
  
    async ngOnInit() {
      await this.getRoles()

    }

}
