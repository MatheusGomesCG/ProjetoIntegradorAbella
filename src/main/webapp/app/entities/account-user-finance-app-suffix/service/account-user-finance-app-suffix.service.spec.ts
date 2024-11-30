import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../account-user-finance-app-suffix.test-samples';

import { AccountUserFinanceAppSuffixService, RestAccountUserFinanceAppSuffix } from './account-user-finance-app-suffix.service';

const requireRestSample: RestAccountUserFinanceAppSuffix = {
  ...sampleWithRequiredData,
  creationDate: sampleWithRequiredData.creationDate?.toJSON(),
};

describe('AccountUserFinanceAppSuffix Service', () => {
  let service: AccountUserFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountUserFinanceAppSuffix | IAccountUserFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AccountUserFinanceAppSuffixService);
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

    it('should create a AccountUserFinanceAppSuffix', () => {
      const accountUser = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountUserFinanceAppSuffix', () => {
      const accountUser = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountUserFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountUserFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountUserFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountUserFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a AccountUserFinanceAppSuffix to an empty array', () => {
        const accountUser: IAccountUserFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addAccountUserFinanceAppSuffixToCollectionIfMissing([], accountUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountUser);
      });

      it('should not add a AccountUserFinanceAppSuffix to an array that contains it', () => {
        const accountUser: IAccountUserFinanceAppSuffix = sampleWithRequiredData;
        const accountUserCollection: IAccountUserFinanceAppSuffix[] = [
          {
            ...accountUser,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountUserFinanceAppSuffixToCollectionIfMissing(accountUserCollection, accountUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountUserFinanceAppSuffix to an array that doesn't contain it", () => {
        const accountUser: IAccountUserFinanceAppSuffix = sampleWithRequiredData;
        const accountUserCollection: IAccountUserFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addAccountUserFinanceAppSuffixToCollectionIfMissing(accountUserCollection, accountUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountUser);
      });

      it('should add only unique AccountUserFinanceAppSuffix to an array', () => {
        const accountUserArray: IAccountUserFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountUserCollection: IAccountUserFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addAccountUserFinanceAppSuffixToCollectionIfMissing(accountUserCollection, ...accountUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountUser: IAccountUserFinanceAppSuffix = sampleWithRequiredData;
        const accountUser2: IAccountUserFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addAccountUserFinanceAppSuffixToCollectionIfMissing([], accountUser, accountUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountUser);
        expect(expectedResult).toContain(accountUser2);
      });

      it('should accept null and undefined values', () => {
        const accountUser: IAccountUserFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addAccountUserFinanceAppSuffixToCollectionIfMissing([], null, accountUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountUser);
      });

      it('should return initial array if no AccountUserFinanceAppSuffix is added', () => {
        const accountUserCollection: IAccountUserFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addAccountUserFinanceAppSuffixToCollectionIfMissing(accountUserCollection, undefined, null);
        expect(expectedResult).toEqual(accountUserCollection);
      });
    });

    describe('compareAccountUserFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountUserFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountUserFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareAccountUserFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountUserFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareAccountUserFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountUserFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareAccountUserFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
