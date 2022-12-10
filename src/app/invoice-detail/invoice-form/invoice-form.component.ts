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
    this.setTotalValue();
  }

  setTotalValue() {
    this.invoiceForm.valueChanges.pipe(tap((res:any) => {
      this.invoiceForm.get('total')?.setValue(res.quantity * res.price);
      let totalPrice=this.invoiceForm.get('total')?.value;
      if(res.discount){
        this.invoiceForm.get('total')?.patchValue(res.quantity * res.discount - totalPrice);
      }
    })).subscribe()
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
