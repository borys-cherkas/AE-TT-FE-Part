export class TransactionsListResponse {
  public transactions: Array<TransactionItem>;
}

export class TransactionItem {
  public id: string;
  public type: string;
  public amount: number;
  public effectiveDate: Date;
}
