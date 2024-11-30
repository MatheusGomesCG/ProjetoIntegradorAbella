import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../investment-finance-app-suffix.test-samples';

import { InvestmentFinanceAppSuffixService, RestInvestmentFinanceAppSuffix } from './investment-finance-app-suffix.service';

const requireRestSample: RestInvestmentFinanceAppSuffix = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.toJSON(),
  endDate: sampleWithRequiredData.endDate?.toJSON(),
};

describe('InvestmentFinanceAppSuffix Service', () => {
  let service: InvestmentFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IInvestmentFinanceAppSuffix | IInvestmentFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(InvestmentFinanceAppSuffixService);
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

    it('should create a InvestmentFinanceAppSuffix', () => {
      const investment = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(investment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InvestmentFinanceAppSuffix', () => {
      const investment = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(investment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InvestmentFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InvestmentFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InvestmentFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInvestmentFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a InvestmentFinanceAppSuffix to an empty array', () => {
        const investment: IInvestmentFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addInvestmentFinanceAppSuffixToCollectionIfMissing([], investment);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(investment);
      });

      it('should not add a InvestmentFinanceAppSuffix to an array that contains it', () => {
        const investment: IInvestmentFinanceAppSuffix = sampleWithRequiredData;
        const investmentCollection: IInvestmentFinanceAppSuffix[] = [
          {
            ...investment,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInvestmentFinanceAppSuffixToCollectionIfMissing(investmentCollection, investment);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InvestmentFinanceAppSuffix to an array that doesn't contain it", () => {
        const investment: IInvestmentFinanceAppSuffix = sampleWithRequiredData;
        const investmentCollection: IInvestmentFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addInvestmentFinanceAppSuffixToCollectionIfMissing(investmentCollection, investment);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(investment);
      });

      it('should add only unique InvestmentFinanceAppSuffix to an array', () => {
        const investmentArray: IInvestmentFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const investmentCollection: IInvestmentFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addInvestmentFinanceAppSuffixToCollectionIfMissing(investmentCollection, ...investmentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const investment: IInvestmentFinanceAppSuffix = sampleWithRequiredData;
        const investment2: IInvestmentFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addInvestmentFinanceAppSuffixToCollectionIfMissing([], investment, investment2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(investment);
        expect(expectedResult).toContain(investment2);
      });

      it('should accept null and undefined values', () => {
        const investment: IInvestmentFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addInvestmentFinanceAppSuffixToCollectionIfMissing([], null, investment, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(investment);
      });

      it('should return initial array if no InvestmentFinanceAppSuffix is added', () => {
        const investmentCollection: IInvestmentFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addInvestmentFinanceAppSuffixToCollectionIfMissing(investmentCollection, undefined, null);
        expect(expectedResult).toEqual(investmentCollection);
      });
    });

    describe('compareInvestmentFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInvestmentFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInvestmentFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareInvestmentFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInvestmentFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareInvestmentFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInvestmentFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareInvestmentFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
