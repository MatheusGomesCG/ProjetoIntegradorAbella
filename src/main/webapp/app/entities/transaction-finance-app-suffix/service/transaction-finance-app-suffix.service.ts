import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITransactionFinanceAppSuffix, NewTransactionFinanceAppSuffix } from '../transaction-finance-app-suffix.model';

export type PartialUpdateTransactionFinanceAppSuffix = Partial<ITransactionFinanceAppSuffix> & Pick<ITransactionFinanceAppSuffix, 'id'>;

type RestOf<T extends ITransactionFinanceAppSuffix | NewTransactionFinanceAppSuffix> = Omit<T, 'transactionDate'> & {
  transactionDate?: string | null;
};

export type RestTransactionFinanceAppSuffix = RestOf<ITransactionFinanceAppSuffix>;

export type NewRestTransactionFinanceAppSuffix = RestOf<NewTransactionFinanceAppSuffix>;

export type PartialUpdateRestTransactionFinanceAppSuffix = RestOf<PartialUpdateTransactionFinanceAppSuffix>;

export type EntityResponseType = HttpResponse<ITransactionFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<ITransactionFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class TransactionFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transactions');

  create(transaction: NewTransactionFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction);
    return this.http
      .post<RestTransactionFinanceAppSuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(transaction: ITransactionFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction);
    return this.http
      .put<RestTransactionFinanceAppSuffix>(`${this.resourceUrl}/${this.getTransactionFinanceAppSuffixIdentifier(transaction)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(transaction: PartialUpdateTransactionFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction);
    return this.http
      .patch<RestTransactionFinanceAppSuffix>(`${this.resourceUrl}/${this.getTransactionFinanceAppSuffixIdentifier(transaction)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTransactionFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTransactionFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTransactionFinanceAppSuffixIdentifier(transaction: Pick<ITransactionFinanceAppSuffix, 'id'>): number {
    return transaction.id;
  }

  compareTransactionFinanceAppSuffix(
    o1: Pick<ITransactionFinanceAppSuffix, 'id'> | null,
    o2: Pick<ITransactionFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getTransactionFinanceAppSuffixIdentifier(o1) === this.getTransactionFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addTransactionFinanceAppSuffixToCollectionIfMissing<Type extends Pick<ITransactionFinanceAppSuffix, 'id'>>(
    transactionCollection: Type[],
    ...transactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transactions: Type[] = transactionsToCheck.filter(isPresent);
    if (transactions.length > 0) {
      const transactionCollectionIdentifiers = transactionCollection.map(transactionItem =>
        this.getTransactionFinanceAppSuffixIdentifier(transactionItem),
      );
      const transactionsToAdd = transactions.filter(transactionItem => {
        const transactionIdentifier = this.getTransactionFinanceAppSuffixIdentifier(transactionItem);
        if (transactionCollectionIdentifiers.includes(transactionIdentifier)) {
          return false;
        }
        transactionCollectionIdentifiers.push(transactionIdentifier);
        return true;
      });
      return [...transactionsToAdd, ...transactionCollection];
    }
    return transactionCollection;
  }

  protected convertDateFromClient<
    T extends ITransactionFinanceAppSuffix | NewTransactionFinanceAppSuffix | PartialUpdateTransactionFinanceAppSuffix,
  >(transaction: T): RestOf<T> {
    return {
      ...transaction,
      transactionDate: transaction.transactionDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTransactionFinanceAppSuffix: RestTransactionFinanceAppSuffix): ITransactionFinanceAppSuffix {
    return {
      ...restTransactionFinanceAppSuffix,
      transactionDate: restTransactionFinanceAppSuffix.transactionDate ? dayjs(restTransactionFinanceAppSuffix.transactionDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTransactionFinanceAppSuffix>): HttpResponse<ITransactionFinanceAppSuffix> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestTransactionFinanceAppSuffix[]>,
  ): HttpResponse<ITransactionFinanceAppSuffix[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
