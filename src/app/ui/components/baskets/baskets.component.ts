import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(/*private toastrService: CustomToastrService*/ spinner: NgxSpinnerService, private basketService: BasketService) { 
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


}
