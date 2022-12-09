import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'invoiceDetails',
    loadChildren: () => import('./invoice-detail/invoice-detail.module').then( m => m.InvoiceDetailModule)
  },
  {
    path: 'invoiceHeader',
    loadChildren: () => import('./invoice-header/invoice-header.module').then( m => m.InvoiceHeaderModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
