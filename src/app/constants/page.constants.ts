import { PageRoutes } from "../models/pageModels.interface";

class PagesSettings {
    pageRoute: PageRoutes[] = [
        { title: 'Invoice Details', url: 'invoiceDetails' },
        { title: 'Invoice Header', url: 'invoiceHeader' },
    ]
}
export const  pagesettings = new PagesSettings();