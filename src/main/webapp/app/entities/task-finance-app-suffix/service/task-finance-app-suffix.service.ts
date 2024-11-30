import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskFinanceAppSuffix, NewTaskFinanceAppSuffix } from '../task-finance-app-suffix.model';

export type PartialUpdateTaskFinanceAppSuffix = Partial<ITaskFinanceAppSuffix> & Pick<ITaskFinanceAppSuffix, 'id'>;

export type EntityResponseType = HttpResponse<ITaskFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<ITaskFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class TaskFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tasks');

  create(task: NewTaskFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.post<ITaskFinanceAppSuffix>(this.resourceUrl, task, { observe: 'response' });
  }

  update(task: ITaskFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.put<ITaskFinanceAppSuffix>(`${this.resourceUrl}/${this.getTaskFinanceAppSuffixIdentifier(task)}`, task, {
      observe: 'response',
    });
  }

  partialUpdate(task: PartialUpdateTaskFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.patch<ITaskFinanceAppSuffix>(`${this.resourceUrl}/${this.getTaskFinanceAppSuffixIdentifier(task)}`, task, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaskFinanceAppSuffixIdentifier(task: Pick<ITaskFinanceAppSuffix, 'id'>): number {
    return task.id;
  }

  compareTaskFinanceAppSuffix(o1: Pick<ITaskFinanceAppSuffix, 'id'> | null, o2: Pick<ITaskFinanceAppSuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaskFinanceAppSuffixIdentifier(o1) === this.getTaskFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addTaskFinanceAppSuffixToCollectionIfMissing<Type extends Pick<ITaskFinanceAppSuffix, 'id'>>(
    taskCollection: Type[],
    ...tasksToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tasks: Type[] = tasksToCheck.filter(isPresent);
    if (tasks.length > 0) {
      const taskCollectionIdentifiers = taskCollection.map(taskItem => this.getTaskFinanceAppSuffixIdentifier(taskItem));
      const tasksToAdd = tasks.filter(taskItem => {
        const taskIdentifier = this.getTaskFinanceAppSuffixIdentifier(taskItem);
        if (taskCollectionIdentifiers.includes(taskIdentifier)) {
          return false;
        }
        taskCollectionIdentifiers.push(taskIdentifier);
        return true;
      });
      return [...tasksToAdd, ...taskCollection];
    }
    return taskCollection;
  }
}
