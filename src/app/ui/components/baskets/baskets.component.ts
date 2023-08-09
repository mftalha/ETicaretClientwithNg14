import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(/*private toastrService: CustomToastrService*/ spinner: NgxSpinnerService) { 
    super(spinner)
  }

  ngOnInit(): void {
/*
    this.toastrService.message("Test içerik", "Test Title", {
      messageType: ToastrMessageType.Info,
      possition: ToastrPosition.BottomCenter
    });
*/

    //this.showSpinner(SpinnerType.BallScaleMultiple)
  }

}
