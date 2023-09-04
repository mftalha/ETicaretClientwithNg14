import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> implements OnDestroy {

  constructor(dialogRef: MatDialogRef<BasketItemRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasketItemDeleteState) { 
    super(dialogRef)
  }
  ngOnDestroy(): void {
    // implements OnDestroy için implement edildi => ne zaman bu component destroy ediliyor bu fonskyion devreye girer
    $('#basketModal').modal('show')
  }

  ngOnInit(): void {
  }

}

export enum BasketItemDeleteState{
  Yes,
  No
}