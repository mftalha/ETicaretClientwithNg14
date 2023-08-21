import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { baseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/File.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  // ActivatedRoute => route parametrelerine subscribe olmamızı sağlayan bir sınıf
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService, private basketService: BasketService, spinner: NgxSpinnerService, private customToastrService: CustomToastrService) {
    super(spinner)
   }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: baseUrl;
  products: List_Product[];

  async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();
    //this.activatedRoute.queryParams => query ise böyle
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1); //sayfa seçilmemiş ise 1. sayfayı ver.
      // her sayfada 12 şertane ürün getir.
      const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(this.currentPageNo -1, this.pageSize,
        () => {
         
      }, 
       errorMessage => {
  
      });
      this.products = data.products;

      this.products = this.products.map<List_Product>(p => {

        const listProduct: List_Product ={
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };

        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize); //10.5 çıkarsa => 11'e yuvarla

      this.pageList = []; // her sayfa değiştiğinde pageList'i sıfırla

      /*
      // 3 ün altında ise 7 sayfayı net göre : 1, 2, 3, 4, 5, 6, 7
      if(this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++) 
          this.pageList.push(i);
        //eğerki son 3 sayfada isem(ürün sayısına göre değişir) son 7 sayfayı göster 
      else if(this.currentPageNo + 3 >= this.totalPageCount)
        for(let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      else
        for (let i = this.currentPageNo -3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
      */

          if (this.totalPageCount >= 7)
          {
            if(this.currentPageNo - 3 <= 0)
            for (let i = 1; i <= 7; i++) 
              this.pageList.push(i);
            //eğerki son 3 sayfada isem(ürün sayısına göre değişir) son 7 sayfayı göster 
            else if(this.currentPageNo + 3 >= this.totalPageCount)
              for(let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
                this.pageList.push(i);
            else
              for (let i = this.currentPageNo -3; i <= this.currentPageNo + 3; i++)
                this.pageList.push(i);
          }
          else
            for (let i = 1; i <= this.totalPageCount; i++)
              this.pageList.push(i);
          

    });
  }

  async addToBasket(product: List_Product){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1; //burda 1 vermeye gerek yok zaten => 1 eklenecek back-end'de 1 eklenebilir direk burdan alınmadan. ilk sepete eklemede
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallScaleMultiple);
    this.customToastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi",{
      messageType: ToastrMessageType.Success,
      possition: ToastrPosition.TopRight
    });
  }
}


/*
const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(0, 12,
        () => {
         
      }, 
       errorMessage => {
  
      });
      this.products = data.products;
*/