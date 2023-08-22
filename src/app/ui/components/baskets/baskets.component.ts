import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Order } from 'src/app/contracts/Order/create_order';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(private toastrService: CustomToastrService, spinner: NgxSpinnerService, private basketService: BasketService, private orderService : OrderService, private router: Router) { 
    super(spinner)
  }

  basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void> {
/*
    this.toastrService.message("Test içerik", "Test Title", {
      messageType: ToastrMessageType.Info,
      possition: ToastrPosition.BottomCenter
    });
*/

    //this.showSpinner(SpinnerType.BallScaleMultiple)


    this.showSpinner(SpinnerType.BallScaleMultiple)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.BallScaleMultiple)
  }

  async changeQuantity(object: any){
    this.showSpinner(SpinnerType.BallScaleMultiple)
    const basketItemId = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem)
    this.hideSpinner(SpinnerType.BallScaleMultiple)
  }

  async removeBasketItem(basketItemId: string){
    this.showSpinner(SpinnerType.BallScaleMultiple);

    
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallScaleMultiple));
    
  }

  async shoppingComplete(){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const order: Create_Order = new Create_Order();
    order.address = "kepez";
    order.description = "order açıklama...";
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallScaleMultiple);
    this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
      messageType: ToastrMessageType.Info,
      possition: ToastrPosition.TopRight
    })
    this.router.navigate(["/"]);
  }
}
