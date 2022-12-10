import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {

  @Output() close = new EventEmitter<any>();

  unitNo: string[] = ['Bar', 'Piece', 'Box', 'Packet'];

  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.invoiceForm = this.buildInvoiceForm();
    // this.setTotalValue();
  }

  setTotalValue() {
    this.invoiceForm.valueChanges.pipe(tap((res: any) => {
      this.invoiceForm.get('total')?.setValue(res.quantity * res.price);
      let totalPrice = this.invoiceForm.get('total')?.value;
      // if(res.discount){
      //   this.invoiceForm.get('total')?.patchValue(res.quantity * res.discount - totalPrice);
      // }
    })).subscribe()
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
    if (this.invoiceForm.valid) {
      this.invoiceForm.value;
    }
  }

  cancel() {
    this.close.emit(null);
  }

}
