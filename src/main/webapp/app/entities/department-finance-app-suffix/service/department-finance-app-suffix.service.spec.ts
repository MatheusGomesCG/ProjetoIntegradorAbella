import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../department-finance-app-suffix.test-samples';

import { DepartmentFinanceAppSuffixService } from './department-finance-app-suffix.service';

const requireRestSample: IDepartmentFinanceAppSuffix = {
  ...sampleWithRequiredData,
};

describe('DepartmentFinanceAppSuffix Service', () => {
  let service: DepartmentFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IDepartmentFinanceAppSuffix | IDepartmentFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DepartmentFinanceAppSuffixService);
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

    it('should create a DepartmentFinanceAppSuffix', () => {
      const department = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(department).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DepartmentFinanceAppSuffix', () => {
      const department = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(department).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DepartmentFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DepartmentFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DepartmentFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDepartmentFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a DepartmentFinanceAppSuffix to an empty array', () => {
        const department: IDepartmentFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addDepartmentFinanceAppSuffixToCollectionIfMissing([], department);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(department);
      });

      it('should not add a DepartmentFinanceAppSuffix to an array that contains it', () => {
        const department: IDepartmentFinanceAppSuffix = sampleWithRequiredData;
        const departmentCollection: IDepartmentFinanceAppSuffix[] = [
          {
            ...department,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDepartmentFinanceAppSuffixToCollectionIfMissing(departmentCollection, department);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DepartmentFinanceAppSuffix to an array that doesn't contain it", () => {
        const department: IDepartmentFinanceAppSuffix = sampleWithRequiredData;
        const departmentCollection: IDepartmentFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addDepartmentFinanceAppSuffixToCollectionIfMissing(departmentCollection, department);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(department);
      });

      it('should add only unique DepartmentFinanceAppSuffix to an array', () => {
        const departmentArray: IDepartmentFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const departmentCollection: IDepartmentFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addDepartmentFinanceAppSuffixToCollectionIfMissing(departmentCollection, ...departmentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const department: IDepartmentFinanceAppSuffix = sampleWithRequiredData;
        const department2: IDepartmentFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addDepartmentFinanceAppSuffixToCollectionIfMissing([], department, department2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(department);
        expect(expectedResult).toContain(department2);
      });

      it('should accept null and undefined values', () => {
        const department: IDepartmentFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addDepartmentFinanceAppSuffixToCollectionIfMissing([], null, department, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(department);
      });

      it('should return initial array if no DepartmentFinanceAppSuffix is added', () => {
        const departmentCollection: IDepartmentFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addDepartmentFinanceAppSuffixToCollectionIfMissing(departmentCollection, undefined, null);
        expect(expectedResult).toEqual(departmentCollection);
      });
    });

    describe('compareDepartmentFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDepartmentFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDepartmentFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareDepartmentFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDepartmentFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareDepartmentFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDepartmentFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareDepartmentFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
