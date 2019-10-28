import {Routes} from '@angular/router';

import {TransactionsPageComponent} from '../../pages/transactions/transactions-page.component';
import {
  TransactionDetailsPageComponent
} from '../../pages/transactions/transaction-details/transaction-details.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'transactions', component: TransactionsPageComponent},
  { path: 'transaction-details/:id', component: TransactionDetailsPageComponent }
];
