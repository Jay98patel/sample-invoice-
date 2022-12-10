import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { InvoiceDetails } from '../models/pageModels.interface';
import { dataSource } from '../shared/dataSource';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;

  isDatabaseConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  invoiceData: BehaviorSubject<InvoiceDetails[]> = new BehaviorSubject<InvoiceDetails[]>([]);

  constructor(private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter) {
    this.createDummyData();
  }

  createDummyData() {
    const sqliteDatabaseConfig = {
      name: 'positronx_db.db',
      location: 'default'
    }
    this.platform.ready().then(() => {
      return this.sqlite.create(sqliteDatabaseConfig)
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  databaseStatus(): Observable<any> {
    return this.isDatabaseConnected.asObservable();
  }

  getInvoiceData(): Observable<InvoiceDetails[]> {
    return this.invoiceData.asObservable();
  }

  getFakeData() {
    this.httpClient.get(
      'assets/data.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getInvoiceList();
          this.isDatabaseConnected.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  /**
   * @returns Invoice List
   */
  getInvoiceList() {
    return this.storage.executeSql('SELECT * FROM invoicetable', []).then(res => {
      let items: InvoiceDetails[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push(dataSource.dummyData);
        }
      }
      this.invoiceData.next(items);
    });
  }

  /**
  * @returns Add Invoice
  */
  addSong(orderNo: number, eName: string, aName: string, unitNo: number, quantity: number, price: number, discount: number, total: number, taxRate1_Percentage: number, totalTax: number, taxRate1_total: number) {
    let data = [orderNo, eName, aName, unitNo, quantity, price, discount, total, taxRate1_Percentage, totalTax, taxRate1_total];
    return this.storage.executeSql('INSERT INTO songtable (orderNo, eNameaName, unitNo, quantity, price, discount, total, taxRate1_Percentage, totalTax, taxRate1_total) VALUES (?, ?)', data)
      .then(res => {
        this.getInvoiceList();
      });
  }

  /**
 * @returns getInoice by id
 */
  getInvoiceById(id: number): Promise<any> {
    return this.storage.executeSql('SELECT * FROM songtable WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        orderNo: res.rows.item(0).orderNo,
        eName: res.rows.item(0).eName,
        aName: res.rows.item(0).aName,
        unitNo: res.rows.item(0).unitNo,
        quantity: res.rows.item(0).eName,
        price: res.rows.item(0).price,
        discount: res.rows.item(0).discount,
        taxRate1_Percentage: res.rows.item(0).taxRate1_Percentage,
        totalTax: res.rows.item(0).totalTax,
        taxRate1_total: res.rows.item(0).taxRate1_total,
      }
    });
  }

  /**
  * @returns update Invoice
  */
  updateInvoice(id: number, invoice: InvoiceDetails) {
    let data = [invoice.orderNo, invoice.eName, invoice.aName, invoice.unitNo, invoice.quantity, invoice.price, invoice.discount, invoice.total, invoice.taxRate1_Percentage, invoice.totalTax, invoice.taxRate1_total];
    return this.storage.executeSql(`UPDATE songtable SET orderNo = ?, eName = ? aName = ?, unitNo = ? quantity = ?, price = ? discount = ?, total = ?, taxRate1_Percentage = ?, totalTax = ?, taxRate1_total = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getInvoiceList();
      })
  }

  /**
  * @returns delete Invoice
  */
  deleteSong(id: number) {
    return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
      .then(_ => {
        this.getInvoiceList();
      });
  }
}
