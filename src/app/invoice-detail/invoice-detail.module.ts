import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailRoutingModule } from './invoice-detail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    InvoiceDetailComponent,
    InvoiceFormComponent,
    InvoiceListComponent,
  ],
  imports: [
    CommonModule,
    InvoiceDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule,
    IonicModule
  ]
})
export class InvoiceDetailModule { }
