import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRegionFinanceAppSuffix, NewRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';

export type PartialUpdateRegionFinanceAppSuffix = Partial<IRegionFinanceAppSuffix> & Pick<IRegionFinanceAppSuffix, 'id'>;

export type EntityResponseType = HttpResponse<IRegionFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<IRegionFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class RegionFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/regions');

  create(region: NewRegionFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.post<IRegionFinanceAppSuffix>(this.resourceUrl, region, { observe: 'response' });
  }

  update(region: IRegionFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.put<IRegionFinanceAppSuffix>(`${this.resourceUrl}/${this.getRegionFinanceAppSuffixIdentifier(region)}`, region, {
      observe: 'response',
    });
  }

  partialUpdate(region: PartialUpdateRegionFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.patch<IRegionFinanceAppSuffix>(`${this.resourceUrl}/${this.getRegionFinanceAppSuffixIdentifier(region)}`, region, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegionFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRegionFinanceAppSuffixIdentifier(region: Pick<IRegionFinanceAppSuffix, 'id'>): number {
    return region.id;
  }

  compareRegionFinanceAppSuffix(o1: Pick<IRegionFinanceAppSuffix, 'id'> | null, o2: Pick<IRegionFinanceAppSuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getRegionFinanceAppSuffixIdentifier(o1) === this.getRegionFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addRegionFinanceAppSuffixToCollectionIfMissing<Type extends Pick<IRegionFinanceAppSuffix, 'id'>>(
    regionCollection: Type[],
    ...regionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const regions: Type[] = regionsToCheck.filter(isPresent);
    if (regions.length > 0) {
      const regionCollectionIdentifiers = regionCollection.map(regionItem => this.getRegionFinanceAppSuffixIdentifier(regionItem));
      const regionsToAdd = regions.filter(regionItem => {
        const regionIdentifier = this.getRegionFinanceAppSuffixIdentifier(regionItem);
        if (regionCollectionIdentifiers.includes(regionIdentifier)) {
          return false;
        }
        regionCollectionIdentifiers.push(regionIdentifier);
        return true;
      });
      return [...regionsToAdd, ...regionCollection];
    }
    return regionCollection;
  }
}
