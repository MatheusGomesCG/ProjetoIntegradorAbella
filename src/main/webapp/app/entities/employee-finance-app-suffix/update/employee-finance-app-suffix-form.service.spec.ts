import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../employee-finance-app-suffix.test-samples';

import { EmployeeFinanceAppSuffixFormService } from './employee-finance-app-suffix-form.service';

describe('EmployeeFinanceAppSuffix Form Service', () => {
  let service: EmployeeFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createEmployeeFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmployeeFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            email: expect.any(Object),
            phoneNumber: expect.any(Object),
            hireDate: expect.any(Object),
            salary: expect.any(Object),
            commissionPct: expect.any(Object),
            manager: expect.any(Object),
            department: expect.any(Object),
          }),
        );
      });

      it('passing IEmployeeFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createEmployeeFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            email: expect.any(Object),
            phoneNumber: expect.any(Object),
            hireDate: expect.any(Object),
            salary: expect.any(Object),
            commissionPct: expect.any(Object),
            manager: expect.any(Object),
            department: expect.any(Object),
          }),
        );
      });
    });

    describe('getEmployeeFinanceAppSuffix', () => {
      it('should return NewEmployeeFinanceAppSuffix for default EmployeeFinanceAppSuffix initial value', () => {
        const formGroup = service.createEmployeeFinanceAppSuffixFormGroup(sampleWithNewData);

        const employee = service.getEmployeeFinanceAppSuffix(formGroup) as any;

        expect(employee).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmployeeFinanceAppSuffix for empty EmployeeFinanceAppSuffix initial value', () => {
        const formGroup = service.createEmployeeFinanceAppSuffixFormGroup();

        const employee = service.getEmployeeFinanceAppSuffix(formGroup) as any;

        expect(employee).toMatchObject({});
      });

      it('should return IEmployeeFinanceAppSuffix', () => {
        const formGroup = service.createEmployeeFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const employee = service.getEmployeeFinanceAppSuffix(formGroup) as any;

        expect(employee).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmployeeFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createEmployeeFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmployeeFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createEmployeeFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
