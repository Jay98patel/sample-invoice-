import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {

  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  cancel() {
    this.close.emit(null);
  }

}
