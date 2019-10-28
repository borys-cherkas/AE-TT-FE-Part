import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiAccessorBase} from './base.api-accessor';
import {CurrentAccountBalanceResponse} from './responses/current-account-balance-response';

@Injectable()
export class BalanceApiAccessor extends ApiAccessorBase {

  constructor(private http: HttpClient) {
    super();
  }

  public getCurrentBalance() : Promise<CurrentAccountBalanceResponse> {
    const url = environment.apiEndpoint + '/Balance';
    return this.http.get(url).toPromise().catch(this.onRejected).then(
      res => res as CurrentAccountBalanceResponse);
  }
}
