import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from '../models/pageModels.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-invoice-header',
  templateUrl: './invoice-header.component.html',
  styleUrls: ['./invoice-header.component.scss'],
})
export class InvoiceHeaderComponent implements OnInit {

  invoiceList: InvoiceDetails[];
  
  constructor(private dbService: DataService) { }

  ngOnInit() {
    this.getInvoiceList();
  }

  getInvoiceList() {
    this.dbService.getInvoiceListData().subscribe((res: InvoiceDetails[]) => {
      this.invoiceList = res;
    }, (error) => {
      console.error('somethings went wrong');
    });
  }

}
