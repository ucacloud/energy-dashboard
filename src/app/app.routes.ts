import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PricesComponent } from './modules/prices/prices.component';
import { SettlementListComponent } from './modules/settlement-list/settlement-list.component';
import { LmpBreakdownComponent } from './modules/lmp-breakdown/lmp-breakdown.component';

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
      {
        path: 'lmp-breakdown',
        component: LmpBreakdownComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
