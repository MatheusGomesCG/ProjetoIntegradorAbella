import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ILocationFinanceAppSuffix } from '../location-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../location-finance-app-suffix.test-samples';

import { LocationFinanceAppSuffixService } from './location-finance-app-suffix.service';

const requireRestSample: ILocationFinanceAppSuffix = {
  ...sampleWithRequiredData,
};

describe('LocationFinanceAppSuffix Service', () => {
  let service: LocationFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: ILocationFinanceAppSuffix | ILocationFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LocationFinanceAppSuffixService);
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

    it('should create a LocationFinanceAppSuffix', () => {
      const location = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(location).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LocationFinanceAppSuffix', () => {
      const location = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(location).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LocationFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LocationFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LocationFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLocationFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a LocationFinanceAppSuffix to an empty array', () => {
        const location: ILocationFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addLocationFinanceAppSuffixToCollectionIfMissing([], location);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(location);
      });

      it('should not add a LocationFinanceAppSuffix to an array that contains it', () => {
        const location: ILocationFinanceAppSuffix = sampleWithRequiredData;
        const locationCollection: ILocationFinanceAppSuffix[] = [
          {
            ...location,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLocationFinanceAppSuffixToCollectionIfMissing(locationCollection, location);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LocationFinanceAppSuffix to an array that doesn't contain it", () => {
        const location: ILocationFinanceAppSuffix = sampleWithRequiredData;
        const locationCollection: ILocationFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addLocationFinanceAppSuffixToCollectionIfMissing(locationCollection, location);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(location);
      });

      it('should add only unique LocationFinanceAppSuffix to an array', () => {
        const locationArray: ILocationFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const locationCollection: ILocationFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addLocationFinanceAppSuffixToCollectionIfMissing(locationCollection, ...locationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const location: ILocationFinanceAppSuffix = sampleWithRequiredData;
        const location2: ILocationFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addLocationFinanceAppSuffixToCollectionIfMissing([], location, location2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(location);
        expect(expectedResult).toContain(location2);
      });

      it('should accept null and undefined values', () => {
        const location: ILocationFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addLocationFinanceAppSuffixToCollectionIfMissing([], null, location, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(location);
      });

      it('should return initial array if no LocationFinanceAppSuffix is added', () => {
        const locationCollection: ILocationFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addLocationFinanceAppSuffixToCollectionIfMissing(locationCollection, undefined, null);
        expect(expectedResult).toEqual(locationCollection);
      });
    });

    describe('compareLocationFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLocationFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLocationFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareLocationFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLocationFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareLocationFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLocationFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareLocationFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
