import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../employee-finance-app-suffix.test-samples';

import { EmployeeFinanceAppSuffixService, RestEmployeeFinanceAppSuffix } from './employee-finance-app-suffix.service';

const requireRestSample: RestEmployeeFinanceAppSuffix = {
  ...sampleWithRequiredData,
  hireDate: sampleWithRequiredData.hireDate?.toJSON(),
};

describe('EmployeeFinanceAppSuffix Service', () => {
  let service: EmployeeFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IEmployeeFinanceAppSuffix | IEmployeeFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(EmployeeFinanceAppSuffixService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a EmployeeFinanceAppSuffix', () => {
      const employee = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(employee).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmployeeFinanceAppSuffix', () => {
      const employee = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(employee).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EmployeeFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmployeeFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EmployeeFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEmployeeFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a EmployeeFinanceAppSuffix to an empty array', () => {
        const employee: IEmployeeFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addEmployeeFinanceAppSuffixToCollectionIfMissing([], employee);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employee);
      });

      it('should not add a EmployeeFinanceAppSuffix to an array that contains it', () => {
        const employee: IEmployeeFinanceAppSuffix = sampleWithRequiredData;
        const employeeCollection: IEmployeeFinanceAppSuffix[] = [
          {
            ...employee,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEmployeeFinanceAppSuffixToCollectionIfMissing(employeeCollection, employee);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmployeeFinanceAppSuffix to an array that doesn't contain it", () => {
        const employee: IEmployeeFinanceAppSuffix = sampleWithRequiredData;
        const employeeCollection: IEmployeeFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addEmployeeFinanceAppSuffixToCollectionIfMissing(employeeCollection, employee);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employee);
      });

      it('should add only unique EmployeeFinanceAppSuffix to an array', () => {
        const employeeArray: IEmployeeFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const employeeCollection: IEmployeeFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addEmployeeFinanceAppSuffixToCollectionIfMissing(employeeCollection, ...employeeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const employee: IEmployeeFinanceAppSuffix = sampleWithRequiredData;
        const employee2: IEmployeeFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addEmployeeFinanceAppSuffixToCollectionIfMissing([], employee, employee2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employee);
        expect(expectedResult).toContain(employee2);
      });

      it('should accept null and undefined values', () => {
        const employee: IEmployeeFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addEmployeeFinanceAppSuffixToCollectionIfMissing([], null, employee, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employee);
      });

      it('should return initial array if no EmployeeFinanceAppSuffix is added', () => {
        const employeeCollection: IEmployeeFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addEmployeeFinanceAppSuffixToCollectionIfMissing(employeeCollection, undefined, null);
        expect(expectedResult).toEqual(employeeCollection);
      });
    });

    describe('compareEmployeeFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEmployeeFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEmployeeFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareEmployeeFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEmployeeFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareEmployeeFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEmployeeFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareEmployeeFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});