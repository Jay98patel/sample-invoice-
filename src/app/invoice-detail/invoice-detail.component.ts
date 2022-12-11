import { Component, OnInit } from '@angular/core';
import { ButtonStatus, InvoiceDetails } from '../models/pageModels.interface';
import { DataService } from '../services/data.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {

  invoiceList: InvoiceDetails[];
  invoiceDetail: InvoiceDetails;
  popupVisible: boolean = false;
  showIt = false;

  withShadingOptionsVisible: boolean;

  constructor(private dbService: DataService) {
  }

  ngOnInit() {
    this.getInvoiceList();
  }

  closeModal(newName: string) {
    this.showIt = false;
  }

  getInvoiceList() {
    this.dbService.getInvoiceListData().subscribe((res: InvoiceDetails[]) => {
      this.invoiceList = res;
    }, (error) => {
      console.error('somethings went wrong');
    });
  }

  editInvoice(invoiceToEdit: InvoiceDetails) {
    this.dbService.updateInvoiceData(invoiceToEdit).subscribe((res: InvoiceDetails) => {
      this.getInvoiceList();
    }, (error) => {
      console.error('somethings went wrong');
    });
  }

  getInvoiceDetail(buttonStatus: ButtonStatus) {
    this.showIt = true;
    this.dbService.getByIdInvoice(buttonStatus.invoiceId).subscribe((res: InvoiceDetails) => {
      this.invoiceDetail = res;
      this.dbService.sendInvoiceData(this.invoiceDetail);
    }, (error) => {
      console.error('somethings went wrong');
    });
  }
}
