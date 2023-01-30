import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,private httpClientService: HttpClientService){
    super(spinner);
  }

  @ViewChild(ListComponent) listComponents: ListComponent  //product componentin altında 2 tane componenet olduğundan hangisini elde etmek istediğimi belirtiyorum. == onun methotlarına erişecem listComponents paremetresi ile.
  // burda yapılan işlem prodoct modül : hem created componenti hem list componenti kapsadığından created componentte eklenen ürünü : list component içindeki listede gösterebilmek için prodoct html ve componenti kullanıyoruz : bir nevi atası olduğu için ilgili componentlerde yapılan işlemleri yakalayabiliyorum burdan ve onların methotlarını tetikleyebiliyorum.
  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts(); //ürün eklendiğinde listeyi tekrar dan güncelleyecektir.
  }

  ngOnInit(): void {
    //this.showSpinner(SpinnerType.BallSpinClockwiseFade);
    
    /*
    // apı tarafındaki tablo verilerinin buradaki karşılıgını =contract'ını oluşturmadan önce bu şekilde çalıştırdık. 
    this.httpClientService.get({
      controller: "products"
    }).subscribe(data => console.log(data)); //bu şekilde prodoct get methodunu çağırıyoruz.
    */

    /*
    // gelen json datayı artık contract karşılğında düzenliyecez.
    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => 
      console.log(data)
      //data[0].name;
    ); //bu şekilde prodoct get methodunu çağırıyoruz.
    */
    
    /*
    this.httpClientService.post({
      controller: "products"
     },{
       name:"Kalem",
       stock: 100,
       price: 15
     }).subscribe();
     */

     /*
     // update işlemi gerçekleşiyor ama bir hata alıyor : api tarafında galiba ilgilenecem. [MTS]
     this.httpClientService.put({
      controller: "products",
     },{
      id: "16000e21-61b5-4365-927c-e84ce86e495d",
      name: "Renkli kağıt",
      stock: 1500,
      price: 5.5
     }).subscribe();
     */

     /*
     //silme işlemimi gerçekleşiyor ama bir hata alıyor : api tarafında galiba ilgilenecem. [MTS]
     this.httpClientService.delete({
      controller: "products",
     },"e7677764-1a99-4d74-bd57-a8865a1ab11a").subscribe();
     */

     /*
     // burada'da dışarıdan farklı bir url li adrese request yollayıp : veri çekmeyi yaptık.
     this.httpClientService.get({
      @*
       bu şekildede çağırabilirim.
      baseUrl : "https://jsonplaceholder.typicode.com",
      controller: "posts"
      *@
     fullEndpoint: "https://jsonplaceholder.typicode.com/posts"
     }).subscribe(data => console.log(data));
     */
     
  }
  

}

