import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../job-history-finance-app-suffix.test-samples';

import { JobHistoryFinanceAppSuffixFormService } from './job-history-finance-app-suffix-form.service';

describe('JobHistoryFinanceAppSuffix Form Service', () => {
  let service: JobHistoryFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobHistoryFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createJobHistoryFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createJobHistoryFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            language: expect.any(Object),
            job: expect.any(Object),
            department: expect.any(Object),
            employee: expect.any(Object),
          }),
        );
      });

      it('passing IJobHistoryFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createJobHistoryFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            language: expect.any(Object),
            job: expect.any(Object),
            department: expect.any(Object),
            employee: expect.any(Object),
          }),
        );
      });
    });

    describe('getJobHistoryFinanceAppSuffix', () => {
      it('should return NewJobHistoryFinanceAppSuffix for default JobHistoryFinanceAppSuffix initial value', () => {
        const formGroup = service.createJobHistoryFinanceAppSuffixFormGroup(sampleWithNewData);

        const jobHistory = service.getJobHistoryFinanceAppSuffix(formGroup) as any;

        expect(jobHistory).toMatchObject(sampleWithNewData);
      });

      it('should return NewJobHistoryFinanceAppSuffix for empty JobHistoryFinanceAppSuffix initial value', () => {
        const formGroup = service.createJobHistoryFinanceAppSuffixFormGroup();

        const jobHistory = service.getJobHistoryFinanceAppSuffix(formGroup) as any;

        expect(jobHistory).toMatchObject({});
      });

      it('should return IJobHistoryFinanceAppSuffix', () => {
        const formGroup = service.createJobHistoryFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const jobHistory = service.getJobHistoryFinanceAppSuffix(formGroup) as any;

        expect(jobHistory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IJobHistoryFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createJobHistoryFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewJobHistoryFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createJobHistoryFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
