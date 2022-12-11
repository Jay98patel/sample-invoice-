import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceDetails } from 'src/app/models/pageModels.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Output() saveOrupdateDetails: EventEmitter<any> = new EventEmitter<any>();

  unitNo: string[] = ['Bar', 'Piece', 'Box', 'Packet'];

  invoiceForm: FormGroup;
  invoiceValue: InvoiceDetails;
  disableFields: boolean = false;
  invoiceDetailSaveOrUpdate = {
    invoiceData: null,
    isSave: true
  }

  constructor(private fb: FormBuilder, private invoiceService: DataService) { }

  ngOnInit() {
    this.invoiceForm = this.buildInvoiceForm();
    this.patchInvoiceValue();
  }

  patchInvoiceValue() {
    this.invoiceService.getInvoiceDetails().subscribe((res: any) => {
      console.log(res, 'res')
      if (!res.buttonStatus) {
        this.disableFields = true;
      }
      if (res.invoiceDetail) {
        this.invoiceForm.patchValue(res.invoiceDetail)
      }
    });
  }

  setTotalPrice(isPercentageChanged: boolean = false) {
    const formValue = this.invoiceForm;
    let quantity = formValue.get('quantity')?.value;
    let price = formValue.get('price')?.value;
    let discount = formValue.get('discount')?.value;
    let totalTax = this.invoiceForm.get('totalTax')?.value ?? 0;
    let taxPercentage = this.invoiceForm.get('taxRate1_Percentage')?.value ?? 0;
    this.invoiceForm.get('total')?.setValue(quantity * price);
    if (formValue.get('discount')?.value) {
      this.invoiceForm.get('total')?.patchValue(Math.abs(quantity * discount - quantity * price));
    }
    if (isPercentageChanged) {
      this.invoiceForm.get('totalTax')?.setValue(quantity * taxPercentage);
    }
    this.invoiceForm.get('taxRate1_total')?.setValue(this.invoiceForm.get('total')?.value + totalTax);
  }

  buildInvoiceForm(): FormGroup {
    return this.fb.group({
      id: [null],
      orderNo: [null],
      eName: [null],
      aName: [null],
      unitNo: [null],
      quantity: [null],
      price: [null],
      discount: [null],
      total: [null],
      taxRate1_Percentage: [null],
      totalTax: [null],
      taxRate1_total: [null]
    });
  }

  saveInvoiceData() {
    if (this.invoiceForm.value.id) {
      this.invoiceDetailSaveOrUpdate = {
        invoiceData: this.invoiceForm.value,
        isSave: false
      };
    } else {
      this.invoiceDetailSaveOrUpdate = {
        invoiceData: this.invoiceForm.value,
        isSave: true
      };
    }
    this.saveOrupdateDetails.emit(this.invoiceDetailSaveOrUpdate);
  }

  cancel() {
    this.close.emit(false);
  }

}
