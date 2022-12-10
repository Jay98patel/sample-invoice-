import { Component, Input, OnInit } from '@angular/core';
import { InvoiceDetails } from 'src/app/models/pageModels.interface';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {

  @Input() invoiceList: InvoiceDetails[];

  constructor() { }

  ngOnInit() { }

  click() {

  }

}
