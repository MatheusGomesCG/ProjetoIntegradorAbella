import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../job-finance-app-suffix.test-samples';

import { JobFinanceAppSuffixFormService } from './job-finance-app-suffix-form.service';

describe('JobFinanceAppSuffix Form Service', () => {
  let service: JobFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createJobFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createJobFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            jobTitle: expect.any(Object),
            minSalary: expect.any(Object),
            maxSalary: expect.any(Object),
            tasks: expect.any(Object),
            employee: expect.any(Object),
          }),
        );
      });

      it('passing IJobFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createJobFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            jobTitle: expect.any(Object),
            minSalary: expect.any(Object),
            maxSalary: expect.any(Object),
            tasks: expect.any(Object),
            employee: expect.any(Object),
          }),
        );
      });
    });

    describe('getJobFinanceAppSuffix', () => {
      it('should return NewJobFinanceAppSuffix for default JobFinanceAppSuffix initial value', () => {
        const formGroup = service.createJobFinanceAppSuffixFormGroup(sampleWithNewData);

        const job = service.getJobFinanceAppSuffix(formGroup) as any;

        expect(job).toMatchObject(sampleWithNewData);
      });

      it('should return NewJobFinanceAppSuffix for empty JobFinanceAppSuffix initial value', () => {
        const formGroup = service.createJobFinanceAppSuffixFormGroup();

        const job = service.getJobFinanceAppSuffix(formGroup) as any;

        expect(job).toMatchObject({});
      });

      it('should return IJobFinanceAppSuffix', () => {
        const formGroup = service.createJobFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const job = service.getJobFinanceAppSuffix(formGroup) as any;

        expect(job).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IJobFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createJobFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewJobFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createJobFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
