import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService} from '../../../../services/common/models/product.service'

declare var $: any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent extends BaseComponent implements OnInit  {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService)
  {
    super(spinner)
  }

  displayedColumns: string[]= ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.LineSpinFadeRotating);
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize: 5, () => this.hideSpinner(SpinnerType.LineSpinFadeRotating), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products); // tabloya verdiğim veriler
    this.paginator.length = allProducts.totalCount; 
    // tabloya verileri alttan sayfaya tıkladıkça getirdiğimizden : alttaki sayfa butonları aktif olsun diye : totalde bu kadar veri var diye belirtiyoruz. : yoksa mesela başta 5 veri geldiğinden aşşagıda 2. sayfa aktif olmuyor : yada 2. sayfaya geçiş butonu.
    //this.dataSource.paginator = this.paginator;
  }

  async pageChanged() {
    await this.getProducts();
   }
     
  delete(id, event) {
    const img: HTMLImageElement = event.srcElement; //burdan img yi elde ediyorum
    // img.parentElement.parentElement :: burda img nin ebevyninden td yi : td nin ebeveyinden : tr yi elde ediyorum tr yi silerekde ilgili satırı kaldırabiliyorum : tablodan == silme için jquery'i' aşşağıda kullandım.
    $(img.parentElement.parentElement).fadeOut(2000); // jquery fadeOut ile 2 saniyede sil. == animasyon ile fadeOut = soldurmak
  }
  

   async ngOnInit() {
    await this.getProducts()
  }

}

/*
export class ListComponent implements AfterViewInit  {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

*/