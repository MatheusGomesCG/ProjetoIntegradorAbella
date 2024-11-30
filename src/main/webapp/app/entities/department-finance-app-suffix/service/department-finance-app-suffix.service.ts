import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDepartmentFinanceAppSuffix, NewDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';

export type PartialUpdateDepartmentFinanceAppSuffix = Partial<IDepartmentFinanceAppSuffix> & Pick<IDepartmentFinanceAppSuffix, 'id'>;

export type EntityResponseType = HttpResponse<IDepartmentFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<IDepartmentFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/departments');

  create(department: NewDepartmentFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.post<IDepartmentFinanceAppSuffix>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartmentFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.put<IDepartmentFinanceAppSuffix>(
      `${this.resourceUrl}/${this.getDepartmentFinanceAppSuffixIdentifier(department)}`,
      department,
      { observe: 'response' },
    );
  }

  partialUpdate(department: PartialUpdateDepartmentFinanceAppSuffix): Observable<EntityResponseType> {
    return this.http.patch<IDepartmentFinanceAppSuffix>(
      `${this.resourceUrl}/${this.getDepartmentFinanceAppSuffixIdentifier(department)}`,
      department,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDepartmentFinanceAppSuffixIdentifier(department: Pick<IDepartmentFinanceAppSuffix, 'id'>): number {
    return department.id;
  }

  compareDepartmentFinanceAppSuffix(
    o1: Pick<IDepartmentFinanceAppSuffix, 'id'> | null,
    o2: Pick<IDepartmentFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getDepartmentFinanceAppSuffixIdentifier(o1) === this.getDepartmentFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addDepartmentFinanceAppSuffixToCollectionIfMissing<Type extends Pick<IDepartmentFinanceAppSuffix, 'id'>>(
    departmentCollection: Type[],
    ...departmentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const departments: Type[] = departmentsToCheck.filter(isPresent);
    if (departments.length > 0) {
      const departmentCollectionIdentifiers = departmentCollection.map(departmentItem =>
        this.getDepartmentFinanceAppSuffixIdentifier(departmentItem),
      );
      const departmentsToAdd = departments.filter(departmentItem => {
        const departmentIdentifier = this.getDepartmentFinanceAppSuffixIdentifier(departmentItem);
        if (departmentCollectionIdentifiers.includes(departmentIdentifier)) {
          return false;
        }
        departmentCollectionIdentifiers.push(departmentIdentifier);
        return true;
      });
      return [...departmentsToAdd, ...departmentCollection];
    }
    return departmentCollection;
  }
}
