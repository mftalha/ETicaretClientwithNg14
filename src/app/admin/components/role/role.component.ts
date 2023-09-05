import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents: ListComponent  //product componentin altında 2 tane componenet olduğundan hangisini elde etmek istediğimi belirtiyorum. == onun methotlarına erişecem listComponents paremetresi ile.
  // burda yapılan işlem prodoct modül : hem created componenti hem list componenti kapsadığından created componentte eklenen ürünü : list component içindeki listede gösterebilmek için prodoct html ve componenti kullanıyoruz : bir nevi atası olduğu için ilgili componentlerde yapılan işlemleri yakalayabiliyorum burdan ve onların methotlarını tetikleyebiliyorum.
  createdRole(createdRole: string) {
    this.listComponents.getRoles(); //ürün eklendiğinde listeyi tekrar dan güncelleyecektir.
  }

}
