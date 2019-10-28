import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransactionsApiAccessor} from '../../core/dataAccessors/transactions.api-accessor';
import {BalanceApiAccessor} from '../../core/dataAccessors/balance.api-accessor';
import {HttpClientModule} from '@angular/common/http';
import {TransactionsPageComponent} from '../../pages/transactions/transactions-page.component';
import {TransactionDetailsPageComponent} from '../../pages/transactions/transaction-details/transaction-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    TransactionsPageComponent,
    TransactionDetailsPageComponent
  ],
  providers: [
    TransactionsApiAccessor,
    BalanceApiAccessor
  ]
})

export class AdminLayoutModule {
}
