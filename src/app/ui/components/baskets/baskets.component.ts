import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent implements OnInit {

  constructor(/*private toastrService: CustomToastrService*/) { 
  }

  ngOnInit(): void {
/*
    this.toastrService.message("Test içerik", "Test Title", {
      messageType: ToastrMessageType.Info,
      possition: ToastrPosition.BottomCenter
    });
*/
  }

}
