import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PricesComponent } from './prices/prices.component';
import { SettlementListComponent } from './settlements/settlement-list/settlement-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'prices',
        component: PricesComponent,
      },
      {
        path: 'settlements',
        component: SettlementListComponent
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
