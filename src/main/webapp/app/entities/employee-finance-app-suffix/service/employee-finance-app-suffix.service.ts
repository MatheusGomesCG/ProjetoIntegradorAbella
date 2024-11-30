import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployeeFinanceAppSuffix, NewEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';

export type PartialUpdateEmployeeFinanceAppSuffix = Partial<IEmployeeFinanceAppSuffix> & Pick<IEmployeeFinanceAppSuffix, 'id'>;

type RestOf<T extends IEmployeeFinanceAppSuffix | NewEmployeeFinanceAppSuffix> = Omit<T, 'hireDate'> & {
  hireDate?: string | null;
};

export type RestEmployeeFinanceAppSuffix = RestOf<IEmployeeFinanceAppSuffix>;

export type NewRestEmployeeFinanceAppSuffix = RestOf<NewEmployeeFinanceAppSuffix>;

export type PartialUpdateRestEmployeeFinanceAppSuffix = RestOf<PartialUpdateEmployeeFinanceAppSuffix>;

export type EntityResponseType = HttpResponse<IEmployeeFinanceAppSuffix>;
export type EntityArrayResponseType = HttpResponse<IEmployeeFinanceAppSuffix[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeFinanceAppSuffixService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employees');

  create(employee: NewEmployeeFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .post<RestEmployeeFinanceAppSuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(employee: IEmployeeFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .put<RestEmployeeFinanceAppSuffix>(`${this.resourceUrl}/${this.getEmployeeFinanceAppSuffixIdentifier(employee)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(employee: PartialUpdateEmployeeFinanceAppSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .patch<RestEmployeeFinanceAppSuffix>(`${this.resourceUrl}/${this.getEmployeeFinanceAppSuffixIdentifier(employee)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmployeeFinanceAppSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmployeeFinanceAppSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmployeeFinanceAppSuffixIdentifier(employee: Pick<IEmployeeFinanceAppSuffix, 'id'>): number {
    return employee.id;
  }

  compareEmployeeFinanceAppSuffix(
    o1: Pick<IEmployeeFinanceAppSuffix, 'id'> | null,
    o2: Pick<IEmployeeFinanceAppSuffix, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getEmployeeFinanceAppSuffixIdentifier(o1) === this.getEmployeeFinanceAppSuffixIdentifier(o2) : o1 === o2;
  }

  addEmployeeFinanceAppSuffixToCollectionIfMissing<Type extends Pick<IEmployeeFinanceAppSuffix, 'id'>>(
    employeeCollection: Type[],
    ...employeesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employees: Type[] = employeesToCheck.filter(isPresent);
    if (employees.length > 0) {
      const employeeCollectionIdentifiers = employeeCollection.map(employeeItem =>
        this.getEmployeeFinanceAppSuffixIdentifier(employeeItem),
      );
      const employeesToAdd = employees.filter(employeeItem => {
        const employeeIdentifier = this.getEmployeeFinanceAppSuffixIdentifier(employeeItem);
        if (employeeCollectionIdentifiers.includes(employeeIdentifier)) {
          return false;
        }
        employeeCollectionIdentifiers.push(employeeIdentifier);
        return true;
      });
      return [...employeesToAdd, ...employeeCollection];
    }
    return employeeCollection;
  }

  protected convertDateFromClient<
    T extends IEmployeeFinanceAppSuffix | NewEmployeeFinanceAppSuffix | PartialUpdateEmployeeFinanceAppSuffix,
  >(employee: T): RestOf<T> {
    return {
      ...employee,
      hireDate: employee.hireDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEmployeeFinanceAppSuffix: RestEmployeeFinanceAppSuffix): IEmployeeFinanceAppSuffix {
    return {
      ...restEmployeeFinanceAppSuffix,
      hireDate: restEmployeeFinanceAppSuffix.hireDate ? dayjs(restEmployeeFinanceAppSuffix.hireDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmployeeFinanceAppSuffix>): HttpResponse<IEmployeeFinanceAppSuffix> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmployeeFinanceAppSuffix[]>): HttpResponse<IEmployeeFinanceAppSuffix[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
