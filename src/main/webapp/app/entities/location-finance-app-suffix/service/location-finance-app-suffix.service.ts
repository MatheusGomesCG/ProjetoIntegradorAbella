import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILocationFinanceAppSuffix, NewLocationFinanceAppSuffix } from '../location-finance-app-suffix.model';

export type PartialUpdateLocationFinanceAppSuffix = Partial<ILocationFinanceAppSuffix> & Pick<ILocationFinanceAppSuffix, 'id'>;

export type EntityResponseType = HttpResponse<ILocationFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<ILocationFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class LocationFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/locations');

  create(location: NewLocationFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.post<ILocationFinanceAppSuffix>(this.resourceUrl, location, { observe: 'response' });
  }

  update(location: ILocationFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.put<ILocationFinanceAppSuffix>(
      `${this.resourceUrl}/${this.getLocationFinanceAppSuffixIdentifier(location)}`,
      location,
      { observe: 'response' },
    );
  }

  partialUpdate(location: PartialUpdateLocationFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.patch<ILocationFinanceAppSuffix>(
      `${this.resourceUrl}/${this.getLocationFinanceAppSuffixIdentifier(location)}`,
      location,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocationFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocationFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLocationFinanceAppSuffixIdentifier(location: Pick<ILocationFinanceAppSuffix, 'id'>): number {
    return location.id;
  }

  compareLocationFinanceAppSuffix(
    o1: Pick<ILocationFinanceAppSuffix, 'id'> | null,
    o2: Pick<ILocationFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getLocationFinanceAppSuffixIdentifier(o1) === this.getLocationFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addLocationFinanceAppSuffixToCollectionIfMissing<Type extends Pick<ILocationFinanceAppSuffix, 'id'>>(
    locationCollection: Type[],
    ...locationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const locations: Type[] = locationsToCheck.filter(isPresent);
    if (locations.length > 0) {
      const locationCollectionIdentifiers = locationCollection.map(locationItem =>
        this.getLocationFinanceAppSuffixIdentifier(locationItem),
      );
      const locationsToAdd = locations.filter(locationItem => {
        const locationIdentifier = this.getLocationFinanceAppSuffixIdentifier(locationItem);
        if (locationCollectionIdentifiers.includes(locationIdentifier)) {
          return false;
        }
        locationCollectionIdentifiers.push(locationIdentifier);
        return true;
      });
      return [...locationsToAdd, ...locationCollection];
    }
    return locationCollection;
  }
}
