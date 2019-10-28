import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TransactionsApiAccessor} from '../../core/dataAccessors/transactions.api-accessor';
import {BalanceApiAccessor} from '../../core/dataAccessors/balance.api-accessor';
import {TransactionListItemViewModel} from './view-models/transaction-list-item.view-model';
import {Router} from '@angular/router';


@Component({
  selector: 'transactions-page',
  moduleId: module.id,
  templateUrl: 'transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})

export class TransactionsPageComponent implements OnInit {

  public currentBalance = 0;
  public accountTransactions = new Array<TransactionListItemViewModel>();

  constructor(private transactionsApi: TransactionsApiAccessor,
              private balanceApi: BalanceApiAccessor,
              private router: Router) {
  }

  ngOnInit(): void {
    this.refreshPage();
  }

  public refreshPage() {
    this.currentBalance = 0;
    this.accountTransactions = new Array<TransactionListItemViewModel>();

    this.updateBalance();
    this.updateTransactions();
  }

  private updateBalance() {
    this.balanceApi.getCurrentBalance().then(resp => {
      this.currentBalance = resp.currentAccountBalance;
    });
  }

  private updateTransactions() {
    this.transactionsApi.getAccountTransactions().then(resp => {
      if (resp && resp.transactions) {
        const mappedAccountTransactions = resp.transactions.map(x => {
          return {
            id: x.id,
            type: this.getTransactionTypeDisplay(x.type),
            amount: x.amount,
            occured: x.effectiveDate
          } as TransactionListItemViewModel;
        });
        mappedAccountTransactions.sort((a, b) => a.occured > b.occured ? -1 : 1);
        this.accountTransactions = mappedAccountTransactions;
      }
    });
  }

  private getTransactionTypeDisplay(type: string) : string {
    return this.isDebit(type) ? 'Debit' : 'Credit';
  }

  public isDebit(type: string) {
    return type.toLowerCase() === 'debit';
  }

  public onTransactionSelected(tr: TransactionListItemViewModel) {
    this.router.navigate(['/transaction-details/', tr.id]);
  }
}
