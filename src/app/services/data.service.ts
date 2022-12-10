import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceDetails } from '../models/pageModels.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  createInvoiceData(InvoiceData:InvoiceDetails){
    return this.http.post<InvoiceDetails>(`${this.baseUrl}/invoiceData`,InvoiceData);
  }

  getInvoiceListData():Observable<InvoiceDetails[]>{
    return this.http.get<InvoiceDetails[]>(`${this.baseUrl}/invoiceData`);
  }

  getByIdInvoice(id:number):Observable<InvoiceDetails>{
    return this.http.get<InvoiceDetails>(`${this.baseUrl}/invoiceData/${id}`);
  }

  updateInvoiceData(data:InvoiceDetails):Observable<InvoiceDetails>{
    return this.http.put<InvoiceDetails>(`${this.baseUrl}/invoiceData/${data.id}`,data);
  }

  deleteInvoiceListData(id:number):Observable<InvoiceDetails>{
    return this.http.delete<InvoiceDetails>(`${this.baseUrl}/invoiceData/${id}`);
  }
}
