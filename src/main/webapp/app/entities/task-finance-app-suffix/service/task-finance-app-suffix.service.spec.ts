import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITaskFinanceAppSuffix } from '../task-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../task-finance-app-suffix.test-samples';

import { TaskFinanceAppSuffixService } from './task-finance-app-suffix.service';

const requireRestSample: ITaskFinanceAppSuffix = {
  ...sampleWithRequiredData,
};

describe('TaskFinanceAppSuffix Service', () => {
  let service: TaskFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaskFinanceAppSuffix | ITaskFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaskFinanceAppSuffixService);
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

    it('should create a TaskFinanceAppSuffix', () => {
      const task = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(task).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaskFinanceAppSuffix', () => {
      const task = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(task).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaskFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaskFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaskFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaskFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a TaskFinanceAppSuffix to an empty array', () => {
        const task: ITaskFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addTaskFinanceAppSuffixToCollectionIfMissing([], task);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task);
      });

      it('should not add a TaskFinanceAppSuffix to an array that contains it', () => {
        const task: ITaskFinanceAppSuffix = sampleWithRequiredData;
        const taskCollection: ITaskFinanceAppSuffix[] = [
          {
            ...task,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaskFinanceAppSuffixToCollectionIfMissing(taskCollection, task);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaskFinanceAppSuffix to an array that doesn't contain it", () => {
        const task: ITaskFinanceAppSuffix = sampleWithRequiredData;
        const taskCollection: ITaskFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addTaskFinanceAppSuffixToCollectionIfMissing(taskCollection, task);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task);
      });

      it('should add only unique TaskFinanceAppSuffix to an array', () => {
        const taskArray: ITaskFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taskCollection: ITaskFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addTaskFinanceAppSuffixToCollectionIfMissing(taskCollection, ...taskArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const task: ITaskFinanceAppSuffix = sampleWithRequiredData;
        const task2: ITaskFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addTaskFinanceAppSuffixToCollectionIfMissing([], task, task2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task);
        expect(expectedResult).toContain(task2);
      });

      it('should accept null and undefined values', () => {
        const task: ITaskFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addTaskFinanceAppSuffixToCollectionIfMissing([], null, task, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task);
      });

      it('should return initial array if no TaskFinanceAppSuffix is added', () => {
        const taskCollection: ITaskFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addTaskFinanceAppSuffixToCollectionIfMissing(taskCollection, undefined, null);
        expect(expectedResult).toEqual(taskCollection);
      });
    });

    describe('compareTaskFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaskFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaskFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareTaskFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaskFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareTaskFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaskFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareTaskFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
