import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonStatus, InvoiceDetails } from 'src/app/models/pageModels.interface';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {

  @Output() invoiceId: EventEmitter<ButtonStatus> = new EventEmitter<ButtonStatus>();

  @Input() invoiceList: InvoiceDetails[];

  constructor() { }

  ngOnInit() { }

  click() {

  }

  editInvoiceDetail(invoiceId: number) {
    const buttonstatus: ButtonStatus = {
      invoiceId: invoiceId,
      isEdit: true
    }
    this.invoiceId.emit(buttonstatus);
  }

  getInvoiceDetail(id: number) {
    const buttonstatus: ButtonStatus = {
      invoiceId: id,
      isEdit: false
    }
    this.invoiceId.emit(buttonstatus);
  }

}
