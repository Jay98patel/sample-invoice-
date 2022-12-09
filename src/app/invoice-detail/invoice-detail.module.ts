import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailRoutingModule } from './invoice-detail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InvoiceDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InvoiceDetailModule { }
