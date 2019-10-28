import {Component, OnInit} from '@angular/core';
import {TransactionDetailsViewModel} from '../view-models/transaction-details.view-model';
import {TransactionsApiAccessor} from '../../../core/dataAccessors/transactions.api-accessor';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'transaction-details-page',
  moduleId: module.id,
  templateUrl: 'transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})

export class TransactionDetailsPageComponent implements OnInit {

  public readonly transactionId: string = null;
  public transactionDetails : TransactionDetailsViewModel = null;

  constructor(private transactionsApi: TransactionsApiAccessor,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.transactionId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadTransactionDetails();
  }

  private loadTransactionDetails() {
    if (!this.transactionId) {
      return;
    }

    this.transactionsApi.getTransactionById(this.transactionId).then(resp => {
      if (resp && resp.transaction) {
        this.transactionDetails = {
          id: resp.transaction.id,
          type: this.getTransactionTypeDisplay(resp.transaction.type),
          amount: resp.transaction.amount,
          occured: resp.transaction.effectiveDate
        } as TransactionDetailsViewModel;
      }
    });
  }

  private getTransactionTypeDisplay(type: string): string {
    return type === 'debit' ? 'Debit' : 'Credit';
  }

  public back() {
    this.router.navigate(['/transactions'])
  }

  public isDebit(type: string) {
    return type.toLowerCase() === 'debit';
  }
}
