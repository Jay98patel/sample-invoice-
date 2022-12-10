import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from '../models/pageModels.interface';
import { DataService } from '../services/data.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {

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
