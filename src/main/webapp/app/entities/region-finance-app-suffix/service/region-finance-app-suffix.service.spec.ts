import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../region-finance-app-suffix.test-samples';

import { RegionFinanceAppSuffixService } from './region-finance-app-suffix.service';

const requireRestSample: IRegionFinanceAppSuffix = {
  ...sampleWithRequiredData,
};

describe('RegionFinanceAppSuffix Service', () => {
  let service: RegionFinanceAppSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IRegionFinanceAppSuffix | IRegionFinanceAppSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(RegionFinanceAppSuffixService);
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

    it('should create a RegionFinanceAppSuffix', () => {
      const region = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(region).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RegionFinanceAppSuffix', () => {
      const region = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(region).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RegionFinanceAppSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RegionFinanceAppSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RegionFinanceAppSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRegionFinanceAppSuffixToCollectionIfMissing', () => {
      it('should add a RegionFinanceAppSuffix to an empty array', () => {
        const region: IRegionFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addRegionFinanceAppSuffixToCollectionIfMissing([], region);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(region);
      });

      it('should not add a RegionFinanceAppSuffix to an array that contains it', () => {
        const region: IRegionFinanceAppSuffix = sampleWithRequiredData;
        const regionCollection: IRegionFinanceAppSuffix[] = [
          {
            ...region,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRegionFinanceAppSuffixToCollectionIfMissing(regionCollection, region);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RegionFinanceAppSuffix to an array that doesn't contain it", () => {
        const region: IRegionFinanceAppSuffix = sampleWithRequiredData;
        const regionCollection: IRegionFinanceAppSuffix[] = [sampleWithPartialData];
        expectedResult = service.addRegionFinanceAppSuffixToCollectionIfMissing(regionCollection, region);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(region);
      });

      it('should add only unique RegionFinanceAppSuffix to an array', () => {
        const regionArray: IRegionFinanceAppSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const regionCollection: IRegionFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addRegionFinanceAppSuffixToCollectionIfMissing(regionCollection, ...regionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const region: IRegionFinanceAppSuffix = sampleWithRequiredData;
        const region2: IRegionFinanceAppSuffix = sampleWithPartialData;
        expectedResult = service.addRegionFinanceAppSuffixToCollectionIfMissing([], region, region2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(region);
        expect(expectedResult).toContain(region2);
      });

      it('should accept null and undefined values', () => {
        const region: IRegionFinanceAppSuffix = sampleWithRequiredData;
        expectedResult = service.addRegionFinanceAppSuffixToCollectionIfMissing([], null, region, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(region);
      });

      it('should return initial array if no RegionFinanceAppSuffix is added', () => {
        const regionCollection: IRegionFinanceAppSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addRegionFinanceAppSuffixToCollectionIfMissing(regionCollection, undefined, null);
        expect(expectedResult).toEqual(regionCollection);
      });
    });

    describe('compareRegionFinanceAppSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRegionFinanceAppSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRegionFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareRegionFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRegionFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareRegionFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRegionFinanceAppSuffix(entity1, entity2);
        const compareResult2 = service.compareRegionFinanceAppSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
