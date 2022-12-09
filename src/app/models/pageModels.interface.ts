export interface PageRoutes {
    title: string;
    url: string
}

export interface InvoiceDetails {
    id?:number;
    orderNo: string;
    eName: string;
    aName: string;
    unitNo: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
    taxRate1_Percentage: number;
    totalTax: number;
    taxRate1_total: number;
}