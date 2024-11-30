import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobHistoryFinanceAppSuffix, NewJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';

export type PartialUpdateJobHistoryFinanceAppSuffix = Partial<IJobHistoryFinanceAppSuffix> & Pick<IJobHistoryFinanceAppSuffix, 'id'>;

type RestOf<T extends IJobHistoryFinanceAppSuffix | NewJobHistoryFinanceAppSuffix> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestJobHistoryFinanceAppSuffix = RestOf<IJobHistoryFinanceAppSuffix>;

export type NewRestJobHistoryFinanceAppSuffix = RestOf<NewJobHistoryFinanceAppSuffix>;

export type PartialUpdateRestJobHistoryFinanceAppSuffix = RestOf<PartialUpdateJobHistoryFinanceAppSuffix>;

export type EntityResponseType = HttpResponse<IJobHistoryFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<IJobHistoryFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobHistoryFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/job-histories');

  create(jobHistory: NewJobHistoryFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .post<RestJobHistoryFinanceAppSuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(jobHistory: IJobHistoryFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .put<RestJobHistoryFinanceAppSuffix>(`${this.resourceUrl}/${this.getJobHistoryFinanceAppSuffixIdentifier(jobHistory)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(jobHistory: PartialUpdateJobHistoryFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .patch<RestJobHistoryFinanceAppSuffix>(`${this.resourceUrl}/${this.getJobHistoryFinanceAppSuffixIdentifier(jobHistory)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestJobHistoryFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestJobHistoryFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getJobHistoryFinanceAppSuffixIdentifier(jobHistory: Pick<IJobHistoryFinanceAppSuffix, 'id'>): number {
    return jobHistory.id;
  }

  compareJobHistoryFinanceAppSuffix(
    o1: Pick<IJobHistoryFinanceAppSuffix, 'id'> | null,
    o2: Pick<IJobHistoryFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getJobHistoryFinanceAppSuffixIdentifier(o1) === this.getJobHistoryFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addJobHistoryFinanceAppSuffixToCollectionIfMissing<Type extends Pick<IJobHistoryFinanceAppSuffix, 'id'>>(
    jobHistoryCollection: Type[],
    ...jobHistoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobHistories: Type[] = jobHistoriesToCheck.filter(isPresent);
    if (jobHistories.length > 0) {
      const jobHistoryCollectionIdentifiers = jobHistoryCollection.map(jobHistoryItem =>
        this.getJobHistoryFinanceAppSuffixIdentifier(jobHistoryItem),
      );
      const jobHistoriesToAdd = jobHistories.filter(jobHistoryItem => {
        const jobHistoryIdentifier = this.getJobHistoryFinanceAppSuffixIdentifier(jobHistoryItem);
        if (jobHistoryCollectionIdentifiers.includes(jobHistoryIdentifier)) {
          return false;
        }
        jobHistoryCollectionIdentifiers.push(jobHistoryIdentifier);
        return true;
      });
      return [...jobHistoriesToAdd, ...jobHistoryCollection];
    }
    return jobHistoryCollection;
  }

  protected convertDateFromClient<
    T extends IJobHistoryFinanceAppSuffix | NewJobHistoryFinanceAppSuffix | PartialUpdateJobHistoryFinanceAppSuffix,
  >(jobHistory: T): RestOf<T> {
    return {
      ...jobHistory,
      startDate: jobHistory.startDate?.toJSON() ?? null,
      endDate: jobHistory.endDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restJobHistoryFinanceAppSuffix: RestJobHistoryFinanceAppSuffix): IJobHistoryFinanceAppSuffix {
    return {
      ...restJobHistoryFinanceAppSuffix,
      startDate: restJobHistoryFinanceAppSuffix.startDate ? dayjs(restJobHistoryFinanceAppSuffix.startDate) : undefined,
      endDate: restJobHistoryFinanceAppSuffix.endDate ? dayjs(restJobHistoryFinanceAppSuffix.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestJobHistoryFinanceAppSuffix>): HttpResponse<IJobHistoryFinanceAppSuffix> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestJobHistoryFinanceAppSuffix[]>,
  ): HttpResponse<IJobHistoryFinanceAppSuffix[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
