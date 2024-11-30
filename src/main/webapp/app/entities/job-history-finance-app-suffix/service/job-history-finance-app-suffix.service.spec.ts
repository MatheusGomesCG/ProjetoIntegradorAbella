import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../job-history-finance-app-suffix.test-samples';

import { JobHistoryFinanceAppSuffixService, RestJobHistoryFinanceAppSuffix } from './job-history-finance-app-suffix.service';

const requireRestSample: RestJobHistoryFinanceAppSuffix = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.toJSON(),
  endDate: sampleWithRequiredData.endDate?.toJSON(),
};

describe('JobHistoryFinanceAppSuffix Service', () => {
  let service: JobHistoryFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IJobHistoryFinanceAppSuffix | IJobHistoryFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(JobHistoryFinanceAppSuffixService);
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

    it('should create a JobHistoryFinanceAppSuffix', () => {
      const jobHistory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(jobHistory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a JobHistoryFinanceAppSuffix', () => {
      const jobHistory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(jobHistory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a JobHistoryFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of JobHistoryFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a JobHistoryFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addJobHistoryFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a JobHistoryFinanceAppSuffix to an empty array', () => {
        const jobHistory: IJobHistoryFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addJobHistoryFinanceAppSuffixToCollectionIfMissing([], jobHistory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobHistory);
      });

      it('should not add a JobHistoryFinanceAppSuffix to an array that contains it', () => {
        const jobHistory: IJobHistoryFinanceAppSuffix = sampleWithRequiredData;
        const jobHistoryCollection: IJobHistoryFinanceAppSuffix[] = [
          {
            ...jobHistory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addJobHistoryFinanceAppSuffixToCollectionIfMissing(jobHistoryCollection, jobHistory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a JobHistoryFinanceAppSuffix to an array that doesn't contain it", () => {
        const jobHistory: IJobHistoryFinanceAppSuffix = sampleWithRequiredData;
        const jobHistoryCollection: IJobHistoryFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addJobHistoryFinanceAppSuffixToCollectionIfMissing(jobHistoryCollection, jobHistory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobHistory);
      });

      it('should add only unique JobHistoryFinanceAppSuffix to an array', () => {
        const jobHistoryArray: IJobHistoryFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const jobHistoryCollection: IJobHistoryFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addJobHistoryFinanceAppSuffixToCollectionIfMissing(jobHistoryCollection, ...jobHistoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const jobHistory: IJobHistoryFinanceAppSuffix = sampleWithRequiredData;
        const jobHistory2: IJobHistoryFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addJobHistoryFinanceAppSuffixToCollectionIfMissing([], jobHistory, jobHistory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobHistory);
        expect(expectedResult).toContain(jobHistory2);
      });

      it('should accept null and undefined values', () => {
        const jobHistory: IJobHistoryFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addJobHistoryFinanceAppSuffixToCollectionIfMissing([], null, jobHistory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobHistory);
      });

      it('should return initial array if no JobHistoryFinanceAppSuffix is added', () => {
        const jobHistoryCollection: IJobHistoryFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addJobHistoryFinanceAppSuffixToCollectionIfMissing(jobHistoryCollection, undefined, null);
        expect(expectedResult).toEqual(jobHistoryCollection);
      });
    });

    describe('compareJobHistoryFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareJobHistoryFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareJobHistoryFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareJobHistoryFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareJobHistoryFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareJobHistoryFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareJobHistoryFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareJobHistoryFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
