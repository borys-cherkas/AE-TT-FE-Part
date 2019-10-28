import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiAccessorBase} from './base.api-accessor';
import {TransactionsListResponse} from './responses/transactions-list-response';
import {TransactionDetailsResponse} from './responses/transaction-details-response';

@Injectable()
export class TransactionsApiAccessor extends ApiAccessorBase {

  constructor(private http: HttpClient) {
    super();
  }

  public getAccountTransactions(): Promise<TransactionsListResponse> {
    const url = environment.apiEndpoint + '/Transactions';
    return this.http.get(url).toPromise().catch(this.onRejected).then(
      x => x as TransactionsListResponse);
  }

  public getTransactionById(transactionId: string) : Promise<TransactionDetailsResponse> {
    const url = environment.apiEndpoint + '/Transactions/' + transactionId;
    return this.http.get(url).toPromise().catch(this.onRejected).then(
      x => x as TransactionDetailsResponse);
  }
}
