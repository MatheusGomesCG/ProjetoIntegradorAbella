import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICountryFinanceAppSuffix } from '../country-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../country-finance-app-suffix.test-samples';

import { CountryFinanceAppSuffixService } from './country-finance-app-suffix.service';

const requireRestSample: ICountryFinanceAppSuffix = {
  ...sampleWithRequiredData,
};

describe('CountryFinanceAppSuffix Service', () => {
  let service: CountryFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: ICountryFinanceAppSuffix | ICountryFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CountryFinanceAppSuffixService);
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

    it('should create a CountryFinanceAppSuffix', () => {
      const country = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(country).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CountryFinanceAppSuffix', () => {
      const country = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(country).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CountryFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CountryFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CountryFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCountryFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a CountryFinanceAppSuffix to an empty array', () => {
        const country: ICountryFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addCountryFinanceAppSuffixToCollectionIfMissing([], country);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(country);
      });

      it('should not add a CountryFinanceAppSuffix to an array that contains it', () => {
        const country: ICountryFinanceAppSuffix = sampleWithRequiredData;
        const countryCollection: ICountryFinanceAppSuffix[] = [
          {
            ...country,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCountryFinanceAppSuffixToCollectionIfMissing(countryCollection, country);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CountryFinanceAppSuffix to an array that doesn't contain it", () => {
        const country: ICountryFinanceAppSuffix = sampleWithRequiredData;
        const countryCollection: ICountryFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addCountryFinanceAppSuffixToCollectionIfMissing(countryCollection, country);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(country);
      });

      it('should add only unique CountryFinanceAppSuffix to an array', () => {
        const countryArray: ICountryFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const countryCollection: ICountryFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addCountryFinanceAppSuffixToCollectionIfMissing(countryCollection, ...countryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const country: ICountryFinanceAppSuffix = sampleWithRequiredData;
        const country2: ICountryFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addCountryFinanceAppSuffixToCollectionIfMissing([], country, country2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(country);
        expect(expectedResult).toContain(country2);
      });

      it('should accept null and undefined values', () => {
        const country: ICountryFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addCountryFinanceAppSuffixToCollectionIfMissing([], null, country, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(country);
      });

      it('should return initial array if no CountryFinanceAppSuffix is added', () => {
        const countryCollection: ICountryFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addCountryFinanceAppSuffixToCollectionIfMissing(countryCollection, undefined, null);
        expect(expectedResult).toEqual(countryCollection);
      });
    });

    describe('compareCountryFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCountryFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCountryFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareCountryFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCountryFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareCountryFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCountryFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareCountryFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
