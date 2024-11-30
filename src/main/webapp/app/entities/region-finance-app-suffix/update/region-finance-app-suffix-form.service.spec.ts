import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../region-finance-app-suffix.test-samples';

import { RegionFinanceAppSuffixFormService } from './region-finance-app-suffix-form.service';

describe('RegionFinanceAppSuffix Form Service', () => {
  let service: RegionFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createRegionFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRegionFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regionName: expect.any(Object),
          }),
        );
      });

      it('passing IRegionFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createRegionFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regionName: expect.any(Object),
          }),
        );
      });
    });

    describe('getRegionFinanceAppSuffix', () => {
      it('should return NewRegionFinanceAppSuffix for default RegionFinanceAppSuffix initial value', () => {
        const formGroup = service.createRegionFinanceAppSuffixFormGroup(sampleWithNewData);

        const region = service.getRegionFinanceAppSuffix(formGroup) as any;

        expect(region).toMatchObject(sampleWithNewData);
      });

      it('should return NewRegionFinanceAppSuffix for empty RegionFinanceAppSuffix initial value', () => {
        const formGroup = service.createRegionFinanceAppSuffixFormGroup();

        const region = service.getRegionFinanceAppSuffix(formGroup) as any;

        expect(region).toMatchObject({});
      });

      it('should return IRegionFinanceAppSuffix', () => {
        const formGroup = service.createRegionFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const region = service.getRegionFinanceAppSuffix(formGroup) as any;

        expect(region).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRegionFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createRegionFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRegionFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createRegionFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
