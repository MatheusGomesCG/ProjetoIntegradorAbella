import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../department-finance-app-suffix.test-samples';

import { DepartmentFinanceAppSuffixFormService } from './department-finance-app-suffix-form.service';

describe('DepartmentFinanceAppSuffix Form Service', () => {
  let service: DepartmentFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createDepartmentFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDepartmentFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            departmentName: expect.any(Object),
            location: expect.any(Object),
          }),
        );
      });

      it('passing IDepartmentFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createDepartmentFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            departmentName: expect.any(Object),
            location: expect.any(Object),
          }),
        );
      });
    });

    describe('getDepartmentFinanceAppSuffix', () => {
      it('should return NewDepartmentFinanceAppSuffix for default DepartmentFinanceAppSuffix initial value', () => {
        const formGroup = service.createDepartmentFinanceAppSuffixFormGroup(sampleWithNewData);

        const department = service.getDepartmentFinanceAppSuffix(formGroup) as any;

        expect(department).toMatchObject(sampleWithNewData);
      });

      it('should return NewDepartmentFinanceAppSuffix for empty DepartmentFinanceAppSuffix initial value', () => {
        const formGroup = service.createDepartmentFinanceAppSuffixFormGroup();

        const department = service.getDepartmentFinanceAppSuffix(formGroup) as any;

        expect(department).toMatchObject({});
      });

      it('should return IDepartmentFinanceAppSuffix', () => {
        const formGroup = service.createDepartmentFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const department = service.getDepartmentFinanceAppSuffix(formGroup) as any;

        expect(department).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDepartmentFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createDepartmentFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDepartmentFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createDepartmentFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
