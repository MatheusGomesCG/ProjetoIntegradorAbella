import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';
import { InvestmentFinanceAppSuffixService } from '../service/investment-finance-app-suffix.service';

import investmentResolve from './investment-finance-app-suffix-routing-resolve.service';

describe('InvestmentFinanceAppSuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: InvestmentFinanceAppSuffixService;
  let resultInvestmentFinanceAppSuffix: IInvestmentFinanceAppSuffix | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(InvestmentFinanceAppSuffixService);
    resultInvestmentFinanceAppSuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IInvestmentFinanceAppSuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        investmentResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultInvestmentFinanceAppSuffix = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultInvestmentFinanceAppSuffix).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        investmentResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultInvestmentFinanceAppSuffix = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toHaveBeenCalled();
      expect(resultInvestmentFinanceAppSuffix).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IInvestmentFinanceAppSuffix>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        investmentResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultInvestmentFinanceAppSuffix = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultInvestmentFinanceAppSuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
