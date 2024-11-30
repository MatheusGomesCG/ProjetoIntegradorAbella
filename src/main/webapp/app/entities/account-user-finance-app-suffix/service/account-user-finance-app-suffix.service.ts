import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAccountUserFinanceAppSuffix, NewAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';

export type PartialUpdateAccountUserFinanceAppSuffix = Partial<IAccountUserFinanceAppSuffix> & Pick<IAccountUserFinanceAppSuffix, 'id'>;

type RestOf<T extends IAccountUserFinanceAppSuffix | NewAccountUserFinanceAppSuffix> = Omit<T, 'creationDate'> & {
  creationDate?: string | null;
};

export type RestAccountUserFinanceAppSuffix = RestOf<IAccountUserFinanceAppSuffix>;

export type NewRestAccountUserFinanceAppSuffix = RestOf<NewAccountUserFinanceAppSuffix>;

export type PartialUpdateRestAccountUserFinanceAppSuffix = RestOf<PartialUpdateAccountUserFinanceAppSuffix>;

export type EntityResponseType = HttpResponse<IAccountUserFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<IAccountUserFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class AccountUserFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-users');

  create(accountUser: NewAccountUserFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountUser);
    return this.http
      .post<RestAccountUserFinanceAppSuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(accountUser: IAccountUserFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountUser);
    return this.http
      .put<RestAccountUserFinanceAppSuffix>(`${this.resourceUrl}/${this.getAccountUserFinanceAppSuffixIdentifier(accountUser)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(accountUser: PartialUpdateAccountUserFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountUser);
    return this.http
      .patch<RestAccountUserFinanceAppSuffix>(`${this.resourceUrl}/${this.getAccountUserFinanceAppSuffixIdentifier(accountUser)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAccountUserFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAccountUserFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAccountUserFinanceAppSuffixIdentifier(accountUser: Pick<IAccountUserFinanceAppSuffix, 'id'>): number {
    return accountUser.id;
  }

  compareAccountUserFinanceAppSuffix(
    o1: Pick<IAccountUserFinanceAppSuffix, 'id'> | null,
    o2: Pick<IAccountUserFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getAccountUserFinanceAppSuffixIdentifier(o1) === this.getAccountUserFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addAccountUserFinanceAppSuffixToCollectionIfMissing<Type extends Pick<IAccountUserFinanceAppSuffix, 'id'>>(
    accountUserCollection: Type[],
    ...accountUsersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountUsers: Type[] = accountUsersToCheck.filter(isPresent);
    if (accountUsers.length > 0) {
      const accountUserCollectionIdentifiers = accountUserCollection.map(accountUserItem =>
        this.getAccountUserFinanceAppSuffixIdentifier(accountUserItem),
      );
      const accountUsersToAdd = accountUsers.filter(accountUserItem => {
        const accountUserIdentifier = this.getAccountUserFinanceAppSuffixIdentifier(accountUserItem);
        if (accountUserCollectionIdentifiers.includes(accountUserIdentifier)) {
          return false;
        }
        accountUserCollectionIdentifiers.push(accountUserIdentifier);
        return true;
      });
      return [...accountUsersToAdd, ...accountUserCollection];
    }
    return accountUserCollection;
  }

  protected convertDateFromClient<
    T extends IAccountUserFinanceAppSuffix | NewAccountUserFinanceAppSuffix | PartialUpdateAccountUserFinanceAppSuffix,
  >(accountUser: T): RestOf<T> {
    return {
      ...accountUser,
      creationDate: accountUser.creationDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAccountUserFinanceAppSuffix: RestAccountUserFinanceAppSuffix): IAccountUserFinanceAppSuffix {
    return {
      ...restAccountUserFinanceAppSuffix,
      creationDate: restAccountUserFinanceAppSuffix.creationDate ? dayjs(restAccountUserFinanceAppSuffix.creationDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAccountUserFinanceAppSuffix>): HttpResponse<IAccountUserFinanceAppSuffix> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestAccountUserFinanceAppSuffix[]>,
  ): HttpResponse<IAccountUserFinanceAppSuffix[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
