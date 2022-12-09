import { InvoiceDetails } from '../models/pageModels.interface'

class DataSource {
    dummyData: InvoiceDetails = {
        orderNo: '1234',
        eName: 'er43',
        aName: "test",
        unitNo: 'Bar',
        quantity: 4,
        price: 190,
        discount: 90,
        total: 400,
        taxRate1_Percentage: 15,
        totalTax: 60,
        taxRate1_total: 460
    }
}

export const dataSource = new DataSource();