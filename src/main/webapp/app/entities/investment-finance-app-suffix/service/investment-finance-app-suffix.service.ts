import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInvestmentFinanceAppSuffix, NewInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';

export type PartialUpdateInvestmentFinanceAppSuffix = Partial<IInvestmentFinanceAppSuffix> & Pick<IInvestmentFinanceAppSuffix, 'id'>;

type RestOf<T extends IInvestmentFinanceAppSuffix | NewInvestmentFinanceAppSuffix> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestInvestmentFinanceAppSuffix = RestOf<IInvestmentFinanceAppSuffix>;

export type NewRestInvestmentFinanceAppSuffix = RestOf<NewInvestmentFinanceAppSuffix>;

export type PartialUpdateRestInvestmentFinanceAppSuffix = RestOf<PartialUpdateInvestmentFinanceAppSuffix>;

export type EntityResponseType = HttpResponse<IInvestmentFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<IInvestmentFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class InvestmentFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/investments');

  create(investment: NewInvestmentFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(investment);
    return this.http
      .post<RestInvestmentFinanceAppSuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(investment: IInvestmentFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(investment);
    return this.http
      .put<RestInvestmentFinanceAppSuffix>(`${this.resourceUrl}/${this.getInvestmentFinanceAppSuffixIdentifier(investment)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(investment: PartialUpdateInvestmentFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(investment);
    return this.http
      .patch<RestInvestmentFinanceAppSuffix>(`${this.resourceUrl}/${this.getInvestmentFinanceAppSuffixIdentifier(investment)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestInvestmentFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestInvestmentFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInvestmentFinanceAppSuffixIdentifier(investment: Pick<IInvestmentFinanceAppSuffix, 'id'>): number {
    return investment.id;
  }

  compareInvestmentFinanceAppSuffix(
    o1: Pick<IInvestmentFinanceAppSuffix, 'id'> | null,
    o2: Pick<IInvestmentFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getInvestmentFinanceAppSuffixIdentifier(o1) === this.getInvestmentFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addInvestmentFinanceAppSuffixToCollectionIfMissing<Type extends Pick<IInvestmentFinanceAppSuffix, 'id'>>(
    investmentCollection: Type[],
    ...investmentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const investments: Type[] = investmentsToCheck.filter(isPresent);
    if (investments.length > 0) {
      const investmentCollectionIdentifiers = investmentCollection.map(investmentItem =>
        this.getInvestmentFinanceAppSuffixIdentifier(investmentItem),
      );
      const investmentsToAdd = investments.filter(investmentItem => {
        const investmentIdentifier = this.getInvestmentFinanceAppSuffixIdentifier(investmentItem);
        if (investmentCollectionIdentifiers.includes(investmentIdentifier)) {
          return false;
        }
        investmentCollectionIdentifiers.push(investmentIdentifier);
        return true;
      });
      return [...investmentsToAdd, ...investmentCollection];
    }
    return investmentCollection;
  }

  protected convertDateFromClient<
    T extends IInvestmentFinanceAppSuffix | NewInvestmentFinanceAppSuffix | PartialUpdateInvestmentFinanceAppSuffix,
  >(investment: T): RestOf<T> {
    return {
      ...investment,
      startDate: investment.startDate?.toJSON() ?? null,
      endDate: investment.endDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restInvestmentFinanceAppSuffix: RestInvestmentFinanceAppSuffix): IInvestmentFinanceAppSuffix {
    return {
      ...restInvestmentFinanceAppSuffix,
      startDate: restInvestmentFinanceAppSuffix.startDate ? dayjs(restInvestmentFinanceAppSuffix.startDate) : undefined,
      endDate: restInvestmentFinanceAppSuffix.endDate ? dayjs(restInvestmentFinanceAppSuffix.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestInvestmentFinanceAppSuffix>): HttpResponse<IInvestmentFinanceAppSuffix> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestInvestmentFinanceAppSuffix[]>,
  ): HttpResponse<IInvestmentFinanceAppSuffix[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
