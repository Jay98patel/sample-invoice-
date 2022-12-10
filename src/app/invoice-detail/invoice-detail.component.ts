import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from '../models/pageModels.interface';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {

  invoiceList: InvoiceDetails[];

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.dbService.databaseStatus().subscribe((res: boolean) => {
      debugger
      console.log(res)
      // if (res) {
        this.getInvoiceList();
      // }
    });
  }

  getInvoiceList() {
    this.dbService.getInvoiceData().subscribe((res: InvoiceDetails[]) => {
      this.invoiceList = res;
    }, (error) => {
      console.error('somethings went wrong');
    });
  }

}
