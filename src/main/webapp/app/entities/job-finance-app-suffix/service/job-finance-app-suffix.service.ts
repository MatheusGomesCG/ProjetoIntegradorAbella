import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobFinanceAppSuffix, NewJobFinanceAppSuffix } from '../job-finance-app-suffix.model';

export type PartialUpdateJobFinanceAppSuffix = Partial<IJobFinanceAppSuffix> & Pick<IJobFinanceAppSuffix, 'id'>;

export type EntityResponseType = HttpResponse<IJobFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<IJobFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/jobs');

  create(job: NewJobFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.post<IJobFinanceAppSuffix>(this.resourceUrl, job, { observe: 'response' });
  }

  update(job: IJobFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.put<IJobFinanceAppSuffix>(`${this.resourceUrl}/${this.getJobFinanceAppSuffixIdentifier(job)}`, job, {
      observe: 'response',
    });
  }

  partialUpdate(job: PartialUpdateJobFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.patch<IJobFinanceAppSuffix>(`${this.resourceUrl}/${this.getJobFinanceAppSuffixIdentifier(job)}`, job, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getJobFinanceAppSuffixIdentifier(job: Pick<IJobFinanceAppSuffix, 'id'>): number {
    return job.id;
  }

  compareJobFinanceAppSuffix(o1: Pick<IJobFinanceAppSuffix, 'id'> | null, o2: Pick<IJobFinanceAppSuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getJobFinanceAppSuffixIdentifier(o1) === this.getJobFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addJobFinanceAppSuffixToCollectionIfMissing<Type extends Pick<IJobFinanceAppSuffix, 'id'>>(
    jobCollection: Type[],
    ...jobsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobs: Type[] = jobsToCheck.filter(isPresent);
    if (jobs.length > 0) {
      const jobCollectionIdentifiers = jobCollection.map(jobItem => this.getJobFinanceAppSuffixIdentifier(jobItem));
      const jobsToAdd = jobs.filter(jobItem => {
        const jobIdentifier = this.getJobFinanceAppSuffixIdentifier(jobItem);
        if (jobCollectionIdentifiers.includes(jobIdentifier)) {
          return false;
        }
        jobCollectionIdentifiers.push(jobIdentifier);
        return true;
      });
      return [...jobsToAdd, ...jobCollection];
    }
    return jobCollection;
  }
}
