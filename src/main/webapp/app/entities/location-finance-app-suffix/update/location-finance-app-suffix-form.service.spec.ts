import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../location-finance-app-suffix.test-samples';

import { LocationFinanceAppSuffixFormService } from './location-finance-app-suffix-form.service';

describe('LocationFinanceAppSuffix Form Service', () => {
  let service: LocationFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createLocationFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLocationFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            streetAddress: expect.any(Object),
            postalCode: expect.any(Object),
            city: expect.any(Object),
            stateProvince: expect.any(Object),
            country: expect.any(Object),
          }),
        );
      });

      it('passing ILocationFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createLocationFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            streetAddress: expect.any(Object),
            postalCode: expect.any(Object),
            city: expect.any(Object),
            stateProvince: expect.any(Object),
            country: expect.any(Object),
          }),
        );
      });
    });

    describe('getLocationFinanceAppSuffix', () => {
      it('should return NewLocationFinanceAppSuffix for default LocationFinanceAppSuffix initial value', () => {
        const formGroup = service.createLocationFinanceAppSuffixFormGroup(sampleWithNewData);

        const location = service.getLocationFinanceAppSuffix(formGroup) as any;

        expect(location).toMatchObject(sampleWithNewData);
      });

      it('should return NewLocationFinanceAppSuffix for empty LocationFinanceAppSuffix initial value', () => {
        const formGroup = service.createLocationFinanceAppSuffixFormGroup();

        const location = service.getLocationFinanceAppSuffix(formGroup) as any;

        expect(location).toMatchObject({});
      });

      it('should return ILocationFinanceAppSuffix', () => {
        const formGroup = service.createLocationFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const location = service.getLocationFinanceAppSuffix(formGroup) as any;

        expect(location).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILocationFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createLocationFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLocationFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createLocationFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
