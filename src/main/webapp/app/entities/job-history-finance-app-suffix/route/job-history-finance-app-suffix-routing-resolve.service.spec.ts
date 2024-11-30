import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';
import { JobHistoryFinanceAppSuffixService } from '../service/job-history-finance-app-suffix.service';

import jobHistoryResolve from './job-history-finance-app-suffix-routing-resolve.service';

describe('JobHistoryFinanceAppSuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: JobHistoryFinanceAppSuffixService;
  let resultJobHistoryFinanceAppSuffix: IJobHistoryFinanceAppSuffix | null | undefined;

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
    service = TestBed.inject(JobHistoryFinanceAppSuffixService);
    resultJobHistoryFinanceAppSuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IJobHistoryFinanceAppSuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        jobHistoryResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultJobHistoryFinanceAppSuffix = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultJobHistoryFinanceAppSuffix).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        jobHistoryResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultJobHistoryFinanceAppSuffix = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toHaveBeenCalled();
      expect(resultJobHistoryFinanceAppSuffix).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IJobHistoryFinanceAppSuffix>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        jobHistoryResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultJobHistoryFinanceAppSuffix = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultJobHistoryFinanceAppSuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
