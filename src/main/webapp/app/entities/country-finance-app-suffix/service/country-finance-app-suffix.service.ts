import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICountryFinanceAppSuffix, NewCountryFinanceAppSuffix } from '../country-finance-app-suffix.model';

export type PartialUpdateCountryFinanceAppSuffix = Partial<ICountryFinanceAppSuffix> & Pick<ICountryFinanceAppSuffix, 'id'>;

export type EntityResponseType = HttpResponse<ICountryFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<ICountryFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class CountryFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/countries');

  create(country: NewCountryFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.post<ICountryFinanceAppSuffix>(this.resourceUrl, country, { observe: 'response' });
  }

  update(country: ICountryFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.put<ICountryFinanceAppSuffix>(`${this.resourceUrl}/${this.getCountryFinanceAppSuffixIdentifier(country)}`, country, {
      observe: 'response',
    });
  }

  partialUpdate(country: PartialUpdateCountryFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.patch<ICountryFinanceAppSuffix>(`${this.resourceUrl}/${this.getCountryFinanceAppSuffixIdentifier(country)}`, country, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountryFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCountryFinanceAppSuffixIdentifier(country: Pick<ICountryFinanceAppSuffix, 'id'>): number {
    return country.id;
  }

  compareCountryFinanceAppSuffix(
    o1: Pick<ICountryFinanceAppSuffix, 'id'> | null,
    o2: Pick<ICountryFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getCountryFinanceAppSuffixIdentifier(o1) === this.getCountryFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addCountryFinanceAppSuffixToCollectionIfMissing<Type extends Pick<ICountryFinanceAppSuffix, 'id'>>(
    countryCollection: Type[],
    ...countriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const countries: Type[] = countriesToCheck.filter(isPresent);
    if (countries.length > 0) {
      const countryCollectionIdentifiers = countryCollection.map(countryItem => this.getCountryFinanceAppSuffixIdentifier(countryItem));
      const countriesToAdd = countries.filter(countryItem => {
        const countryIdentifier = this.getCountryFinanceAppSuffixIdentifier(countryItem);
        if (countryCollectionIdentifiers.includes(countryIdentifier)) {
          return false;
        }
        countryCollectionIdentifiers.push(countryIdentifier);
        return true;
      });
      return [...countriesToAdd, ...countryCollection];
    }
    return countryCollection;
  }
}
