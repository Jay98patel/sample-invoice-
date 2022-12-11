import { NgModule } from '@angular/core';
import { InvoiceHeaderRoutingModule } from './invoice-header-routing.module';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { InvoiceHeaderComponent } from './invoice-header.component';


@NgModule({
  declarations: [
    InvoiceHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    InvoiceHeaderRoutingModule,
  ],
  providers: [
    DataService
  ]
})
export class InvoiceHeaderModule { }
